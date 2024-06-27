export default class Locker{
    IsLocked: boolean = false
    Lock(){
        this.IsLocked = true;
    }
    Unlock(){
        this.IsLocked = false;
    }
}