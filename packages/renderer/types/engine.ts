
import { SolutionStep } from "./Solution";
import Log from  "./log";

export default class Engine {  

	engineContext = {}

	async execute(automationStep:SolutionStep) {
		if(automationStep.waitForStep)
			await this.executeTask(automationStep, this);
		else
			this.executeTask(automationStep,this);

	};

	executeTask(automationStep:SolutionStep, engine : Engine, stepCompleted) {
		// this is executed in Queee's context
		Log.info(`Evaluation Step ${automationStep.number} started`);
		try {
			engine.evalInContext(automationStep.automationScript,
				{
					engineContext: engine.engineContext,
					stepCompleted: stepCompleted,
				});

			//log.info(`Evaluation Step ${automationStep.number} execute successfully, result is ${engine.engineContext.result}`); 
			Log.info(`Evaluation Step ${automationStep.number} execute successfully!`);
			//log.info(`Evaluation Step ${automationStep.number} execute successfully, result is ${this.result}`); 

		} catch (e) {
			Log.info(`Evaluation Step ${automationStep.number} execute failed with exception: ${e}`);
			//stepCompleted(e);

		}
		finally {
		}
		if (automationStep.waitForStep) { }
		//else stepCompleted(null);

	};


	evalInContext(js, context) {
		//# Return the results of the in-line anonymous function we .call with the passed context
		return function () { return eval(js); }.call(context);
	}

}