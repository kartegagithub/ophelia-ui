## withBasePage
withBasePage is not ophelia-next own function/components. It is a recommendation for standardization.

Most applications have their own tokens, user authentication, SEO logic. We tried to centralize all these logics.

All pages must be wrapped with withBasePage.

Example:
```
const checkToken = async (client: ApplicationClient, res?: ServerResponse<IncomingMessage>, req?: IncomingMessage) => {
    if(res === undefined || req === undefined)
        return;

    // initial Settings
    var services = client.CreateService()
    const data = await services.Configuration.initApp().call()
    if(data && data.data){   
        client.AppData.user = data?.data?.user;
        client.AppData.isLoggedIn = data?.data?.user !== null && data?.data?.user !== undefined;
        client.AppData.languages = data?.data?.languages;
        client.AppData.userLanguageID = data?.data?.user !== null? data?.data?.user?.languageID: 0
        if(client.AppData.user && client.AppData.userLanguageID > 0){
            var lang = findInArray(client.AppData.languages, client.AppData.userLanguageID, "id").value
            if(lang){
                changeRegion(lang.isoCode)
            }
        }
        var setting = getCurrentRegionSetting()
        if(setting){ //Global cache for translations
            client.Region = setting?.Code
            if(!setting?.Translations && client.AppData.languages){
                setting.Translations = {}
                for (let index = 0; index < client.AppData.languages.length; index++) {
                    const lang = client.AppData.languages[index];
                    setting = getRegionSetting(lang.isoCode)
                    if(!setting){
                        console.log("Could not find region settings for " + (lang.isoCode))
                    }
                    else{
                        const data = await services.Configuration.getTranslationResource({ langID: lang.id, langCode: lang.isoCode, prefix: "" })
                        setting.Translations = data; 
                    }
                }
            }
        }
    }
    else{
        console.log("SSR:checkToken:initApp:error", data)
    }
}

const withBasePage = <T extends Object>(C: React.ComponentType<T>, pageProps: PageProps, initialPropsFn: Function | undefined = (ctx: any) => {}) => {
    class BasePage extends React.Component<T & {
            AppClient?: ApplicationClient | undefined,
            pageProps?: PageProps
        }> {

        // If any error occurs in this section, processing is left to client side.
        static getInitialProps = wrapper.getInitialPageProps(({ dispatch }) =>
            async (ctx): Promise<any> => {
              const { res, req } = ctx;
              if(req && res){
                if(req.headers["purpose"] == "prefetch" || req.headers["x-middleware-prefetch"] == "1"|| req.headers["x-nextjs-data"] == "1"){
                    return {};
                }
                else if(req.url){
                    const fileExtensions = /^\/.*\.(ico|png|jpg|jpeg|pdf|doc|docx|xls|xlsx|zip|rar)$/g
                    var match = req.url.match(fileExtensions);
                    if(match && match.length > -1) return {};

                    const disabledFileExtensions = /^\/.*\.(exe|dll|jar|sh)$/g
                    var match = req.url.match(disabledFileExtensions);
                    if(match && match.length > -1){
                        console.log("Disallowed content requested", req?.url)
                        res.statusCode = 404
                        res.end()
                        return {}
                    }
                }
              }
              var client: ApplicationClient | undefined = undefined;
              if(req && req)
              {
                client = getAppClient();
                client.Context = ctx;
                await checkToken(client, res, req);
              }
              else client = window.OpheliaAppClient;
              if(!client?.Refresh)
                checkMissingProperties(client)
              client?.Refresh();
              var path: string | undefined = "";
              if(client?.IsClientSide) path = document.location.href;
              else path = req?.url;

              var propData: { path: string | undefined, pageProps: PageProps, AppClient?: ApplicationClient, params: any, redirect?: { location: string, status?: string}} = { path: path, pageProps, AppClient: undefined, params: {}, redirect: undefined}
              if(ctx)
                propData.params = ctx.query
            
              if(!pageProps.SEO){
                pageProps.SEO = {
                    Title: client?.AppTitle,
                    Description: client?.AppDescription
                }
              }
              if(!pageProps.PageHeader) pageProps.PageHeader = { Visible: true }
              if (initialPropsFn !== null) {
                var innerData = await initialPropsFn(client, pageProps, ctx.query, client?.CreateService() as Services);
                if (innerData) propData = { ...{ pageProps }, ...innerData };
              }
              if(pageProps.SEO && pageProps.SEO.Key && !pageProps.SEO.Title)
                pageProps.SEO.Title = client?.Translate(pageProps.SEO.Key)
              if(pageProps.PageHeader && !pageProps.PageHeader.Title && pageProps.SEO && pageProps.SEO.Title)
                pageProps.PageHeader.Title = pageProps.SEO.Title

              propData.AppClient = client?.Hydrate()
              if(propData.redirect && propData.redirect.location){
                console.log("Redirecting to requested URL")
                if(res){
                    res.setHeader("Location", propData.redirect.location)
                    res.statusCode = 302
                    res.end()
                }
                if(client?.IsClientSide) Router.push(propData.redirect.location)
                return {}
              }
              if(propData.pageProps.Auth?.Require === true){
                if(!client?.AppData?.user){
                    console.log("Not logged in user tried to access private page")
                    if(res){
                        res.setHeader("Location", `/login?redir=${req?.url}`)
                        res.statusCode = 302
                        res.end()
                    }
                    if(client?.IsClientSide) Router.push(`/login?redir=${req?.url}`)
                    return {}
                }
              }
              if(propData.pageProps.Auth?.AnonymousAccess === false){
                if(client?.AppData?.user){
                    console.log("Logged in user tried to access anonymous only page")
                    if(res){
                        res.setHeader("Location", "/")
                        res.statusCode = 302
                        res.end()
                    }
                    if(client?.IsClientSide) Router.push("/")
                    return {}
                }
              }
              return propData
            }
        )
        loaded: boolean = false
        componentDidMount(): void {
            this.props?.AppClient?.PublishMissingTranslations();
        }
        render() {
            checkMissingProperties(this.props?.AppClient)
            var seo = this.props?.pageProps?.SEO
            try {
                return (
                    <>
                        {seo !== undefined &&
                        <Head>
                            {seo.Title && <title>{seo.Title}</title>}
                            {seo.Description && <meta key="description" name="description" content={seo.Description} />}
                            {seo.Custom !== undefined &&
                                seo.Custom.map((item: any) => {
                                    return <meta key={item.Name} name={item.Name} content={item.Description} />
                                })
                            }
                        </Head>}
                        <C {...this.props} />
                    </>
                )
            } catch (error) {
                console.error(error);
                return (<div>
                    <div>Location: withBasePage</div>
                    <div>Type: RenderError</div>
                    <div>{JSON.stringify(error)}</div>
                </div>)
            }            
        }
    }
    return BasePage
}

export default withBasePage
```

Example usage of withBasePage:
```
function Page({
  AppClient,
  pageProps,
  params,
  path,
}: {
  AppClient: ApplicationClient;
  pageProps: PageProps;
  params: any;
  path: string;
}) {
  const pageData = pageProps?.Data;
  if (!pageData) return <NotFound AppClient={AppClient} />;

  return (
    <>
      <h1>{pageData.title}</h1>
      <p>{pageData.description}</p>
    </>
  );
}

export default withBasePage(
  Page,
  {
    Auth: { Require: false },
  },
  async (
    client: ApplicationClient,
    pageProps: PageProps,
    params: any,
    services: Services
  ) => {
    var PageData = await services.Content.getPage("home").call();
    pageProps.Data = PageData;
    pageProps.SEO = {
      Title: PageData.title
    };
    return {};
  }
);
```