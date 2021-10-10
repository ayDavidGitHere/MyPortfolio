
(()=>{
//return ;
var bballDir  =  (3.143/180)*180;
let chang = 1; let yo = 0;

                var dd =(
                ((bballDir>3.14*1/2 && bballDir<3.14*2/2) 
                ||(bballDir>3.14*3/2 && bballDir<3.14*2))?-1:1
                );
                console.log("bballDir: ${"+bballDir+"}: "
                +(bballDir*180/3.143)+"");
                console.log('dd: ${'+dd+'}');
                console.log("");
            bballDir = bballDir
            +(-2*bballDir+6.28)*chang
            +dd*3.143*2/4*yo;
            console.log(bballDir)
            
            
            
            
})();
            
let a = 360+45;
let m = a%360;
console.log(m);











console.log("$$$$$$$$$$$$$$$$")
const minimumEditDistance = (word1, word2) => {
  const n = word1.length
  const m = word2.length
  const dp = new Array(m + 1).fill(0).map(item => [])

  /*
    fill dp matrix with default values -
        - first row is filled considering no elements in word2.
        - first column filled considering no elements in word1.
    */

  for (let i = 0; i < n + 1; i++) {
    dp[0][i] = i
  }

  for (let i = 0; i < m + 1; i++) {
    dp[i][0] = i
  }

  /*
        indexing is 1 based for dp matrix as we defined some known values at first row and first column/
    */

  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      const letter1 = word1[j - 1]
      const letter2 = word2[i - 1]

      if (letter1 === letter2) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1
      }
    }
  }

  return dp[m][n]
}

const main = () => {
  console.log(minimumEditDistance('horse', 'ros'))
  console.log(minimumEditDistance('cat', 'cut'))
  console.log(minimumEditDistance('', 'abc'))
  console.log(minimumEditDistance('google', 'glgool'))
}

main()