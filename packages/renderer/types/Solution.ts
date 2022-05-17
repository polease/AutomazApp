




export interface SolutionStep {
    number: number, //2,
    name: string, // "get clipboard as @keyword",
    automationScript: string,
    waitForStep? : boolean

    //     `
    //   const {clipboard} = require('electron')
    //   this.engineContext.result = clipboard.readText() 
    // `,
}

export interface Problem{
    problemID : string,
    title: string, // where can i can find xxx
    context? : string,
    detail?: string, 
}

export interface ProblemSolution {
    solutionId:string, //
    solutionOverview: string, //"search selected text in google",
    fixingProblem: Problem,
    author?: string,
    shortcutKeyBinding?: string, // "Ctrl+Alt+1",
    enviroment?: string[], //["automatwin", "chrome"],
    steps: SolutionStep[]
}


export interface ProblemSearchInfo {
    problemHint: string
    matchingSolutions?: ProblemSolution[],
    selectedSolution?: ProblemSolution
  }
