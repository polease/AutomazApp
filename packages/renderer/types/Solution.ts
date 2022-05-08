


export interface ProblemStatement {
    title: string,
    context: string,
    block: string,
    author: string,

}

export interface SolutionStep {
    number: BigInteger, //2,
    name: string, // "get clipboard as @keyword",
    automation: string,

    //     `
    //   const {clipboard} = require('electron')
    //   this.engineContext.result = clipboard.readText() 
    // `,
}

export interface SolutionInfo {
    solutionOverview: string, //"search selected text in google",
    shortcutKeyBinding: string, // "Ctrl+Alt+1",
    enviroment: [], //["automatwin", "chrome"],
    steps: []
}


export interface ProblemSolution {
    problem: ProblemStatement,
    solution: SolutionInfo,

}
export interface ProblemSearchInfo {
    problemHint?: string
    matchingProblems?: ProblemSolution[],
    selectedSolution: ProblemSolution
  }
