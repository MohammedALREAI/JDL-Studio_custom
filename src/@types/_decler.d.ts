declare namespace TestNamespace{


    export  function StartAction(start:number,end:number):number{
        return Math.abs(start-end)
    }
}


namespace StringUtility 
{
    function ToCapital(str: string): Record<name,string> {
        return str.toUpperCase();
    }

    function SubString(str: string, from: number, length: number = 0): string {
        return str.substr(from, length);
    }
}