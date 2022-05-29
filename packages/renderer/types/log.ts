
 
export default class Log {

	public static info(msg: string) {
		var currentDate = '[' + new Date().toISOString() + '] ';
		console.log( `${currentDate} Automaz Info ${msg}`);
	}

	public static error(msg: string) {
		var currentDate = '[' + new Date().toISOString() + '] ';
		console.error( `${currentDate} : Automaz Error ${msg}`);
	}


	public static errorObject(obj: any) {
		var currentDate = '[' + new Date().toISOString() + '] ';
		console.error( `${currentDate} : Automaz Error `,obj);
	}

	public static infoObject(obj: any) {
		var currentDate = '[' + new Date().toISOString() + '] ';
		console.log(currentDate,obj);
	}

	  
	  

}