
import { ProblemSolution, SolutionStep } from "./Solution";
import Log from "./log";
import { sleep } from "./util";

export default class Engine {

	
	engineContext = {}

	public async executeSolution(solution: ProblemSolution) {

		var result = null;
		//todo: check environment first
		for (var step of solution.steps)
			await this.executeStep(step);
		//this.executionInfo = result;
	}

	public async executeStep(automationStep: SolutionStep) {
		if (automationStep.waitForStep)
			await this.executeTask(automationStep, this);
		else
			this.executeTask(automationStep, this);

	};

	async executeTask(automationStep: SolutionStep, engine: Engine) {

		if (automationStep.delayStartMilliseconds)
			await sleep(automationStep.delayStartMilliseconds);

		// this is executed in Queee's context
		Log.info(`Evaluation Step ${automationStep.number} started, waitForStep ${automationStep.waitForStep}`);
		Log.infoObject(automationStep);
		try {
			if (automationStep.waitForStep)
				await engine.asyncEvalInContext(automationStep.automationScript, engine.engineContext);
			else
				engine.evalInContext(automationStep.automationScript, engine.engineContext);

			//log.info(`Evaluation Step ${automationStep.number} execute successfully, result is ${engine.engineContext.result}`); 
			Log.info(`Evaluation Step ${automationStep.number} execute successfully!`);
			//log.info(`Evaluation Step ${automationStep.number} execute successfully, result is ${this.result}`); 

		} catch (e) {
			Log.info(`Evaluation Step ${automationStep.number} execute failed with exception: ${e}`);
			//stepCompleted(e);

		}
		finally {
		}

		if (automationStep.delayEndMilliseconds)
			await sleep(automationStep.delayEndMilliseconds);

	};


	evalInContext(js, context) {
		//# Return the results of the in-line anonymous function we .call with the passed context
		return function () { return eval(js); }.call(context);
	}

	async asyncEvalInContext(js, context) {
		//# Return the results of the in-line anonymous function we .call with the passed context
		const asyncJS = `(async () =>{ 
			 ${js} 

			 return this.result;
			
			})()`;
		let result = function () { return eval(asyncJS); }.call(context);
		return result;

		}





}