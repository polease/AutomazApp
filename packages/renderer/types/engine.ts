
import { SolutionStep } from "./Solution";
import Log from  "./log";
import { sleep } from "./util";

export default class Engine {  

	engineContext = {}

	async execute(automationStep:SolutionStep) {
		if(automationStep.waitForStep)
			await this.executeTask(automationStep, this);
		else
			this.executeTask(automationStep,this);

	};

	async executeTask(automationStep:SolutionStep, engine : Engine) {

		if(automationStep.delayStartMilliseconds)
			await sleep(automationStep.delayStartMilliseconds);

		// this is executed in Queee's context
		Log.info(`Evaluation Step ${automationStep.number} started, waitForStep ${automationStep.waitForStep}`);
		Log.infoObject(automationStep);
		try {
			engine.evalInContext(automationStep.automationScript,engine.engineContext);

			//log.info(`Evaluation Step ${automationStep.number} execute successfully, result is ${engine.engineContext.result}`); 
			Log.info(`Evaluation Step ${automationStep.number} execute successfully!`);
			//log.info(`Evaluation Step ${automationStep.number} execute successfully, result is ${this.result}`); 

		} catch (e) {
			Log.info(`Evaluation Step ${automationStep.number} execute failed with exception: ${e}`);
			//stepCompleted(e);

		}
		finally {
		} 

		if(automationStep.delayEndMilliseconds)
			await sleep(automationStep.delayEndMilliseconds);

	};


	evalInContext(js, context) {
		//# Return the results of the in-line anonymous function we .call with the passed context
		return function () { return eval(js); }.call(context);
	}

}