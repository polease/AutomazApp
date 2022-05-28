
 
export default class Log {

	public static info(msg: string) {
		var currentDate = '[' + new Date().toISOString() + '] ';
		console.log( `${currentDate} Automaz Info ${msg}`);
	}


	public static infoObject(obj: any) {
		var currentDate = '[' + new Date().toISOString() + '] ';
		console.log(currentDate,obj);
	}

	  
	  

}