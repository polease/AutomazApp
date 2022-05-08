const d3 = require("d3-queue")
import Log from  "./log";

export default class Engine {
	q = d3.queue(1); 
	log = new Log();

	engineContext = {}

	execute(automationStep) {
		this.q.defer(this.executeTask, automationStep, this);

	};

	executeTask(automationStep, engine, stepCompleted) {
		// this is executed in Queee's context
		log.info(`Evaluation Step ${automationStep.number} started`);
		try {
			engine.evalInContext(automationStep.automation,
				{
					engineContext: engine.engineContext,
					stepCompleted: stepCompleted,
				});

			//log.info(`Evaluation Step ${automationStep.number} execute successfully, result is ${engine.engineContext.result}`); 
			log.info(`Evaluation Step ${automationStep.number} execute successfully!`);
			//log.info(`Evaluation Step ${automationStep.number} execute successfully, result is ${this.result}`); 

		} catch (e) {

			log.info(`Evaluation Step ${automationStep.number} execute failed with exception: ${e}`);
			stepCompleted(e);

		}
		finally {
		}
		if (automationStep.waitForStep) { }
		else stepCompleted(null);

	};


	evalInContext(js, context) {
		//# Return the results of the in-line anonymous function we .call with the passed context
		return function () { return eval(js); }.call(context);
	}

}