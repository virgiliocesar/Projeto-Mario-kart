const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};
const player2 = {
  NOME: "Bowser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let list = ["RETA", "CURVA", "CONFRONTO"];
  let random = Math.floor(Math.random() * list.length);
  let result = list[random];

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    //draw block
    let block = await getRandomBlock();

    //rotate data
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //variable test
    let TotalTestSkill1 = 0;
    let TotalTestSkill2 = 0;
    let mesg = `🏁 Rodada ${round} 🏁 \nBloco: ${block}`;

    if (block === "RETA") {
      console.log(mesg);
      TotalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      TotalTestSkill2 = diceResult2 + character2.VELOCIDADE;
      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );
      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }
    if (block === "CURVA") {
      console.log(mesg);
      TotalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      TotalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );
      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }
    if (block === "CONFRONTO") {
      console.log(mesg);
      let powerRsult1 = diceResult1 + character1.PODER;
      let powerRsult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥊`);
      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );
      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

        if (powerRsult1 > powerRsult2 && character2.PONTOS > 0) {
          console.log(`${character1.NOME} venceu o confronto! 🏁🏁🏁 ${character2.NOME} perdeu 1️⃣ ponto 🐢`);
        character2.PONTOS--;
      }

        if (powerRsult2 > powerRsult1 && character1.PONTOS > 0) {
          console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1️⃣ ponto 🐢`);
        character1.PONTOS--;
      }

      console.log(powerRsult1 === powerRsult2 ? "🏁🏁🏁 EMPATE 🏁🏁🏁" : "");
    }

    //checking winner

    if (TotalTestSkill1 > TotalTestSkill2) {
      character1.PONTOS++;
      console.log(`🏁 ${character1.NOME} marcou 1️⃣ ponto 🏁`);
    } else if (TotalTestSkill2 > TotalTestSkill1) {
      character2.PONTOS++;
      console.log(`🏁 ${character2.NOME} marcou 1️⃣ ponto 🏁`);
      }
      console.log(
        "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"
      );
  }
  
}

async function declareWinner(character1, character2) {
    console.log("Resultado final");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n🏁 ${character1.NOME} Winner! 🏁`);
   else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n🏆 ${character2.NOME} winner! 🏆`);
   else
    console.log(`🏁 Empate! 🏁`);
  }

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...🚦\n`
  );
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
