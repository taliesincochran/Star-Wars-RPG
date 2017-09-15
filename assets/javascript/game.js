var game = {
	"obiwan": {
		"name": "Obiwan Kenobi",
		"health":120,
		"attack":8,
		"counter":12,
	},
	"luke": {
		"name": "Luke Skywalker",
		"health":100,
		"attack":12,
		"counter":5,
	},
	"sidious": {
		"name": "Darth Sidious",
		"health":150,
		"attack":20,
		"counter":20,
	},
	"maul": {
		"name": "Darth Maul",
		"health":180,
		"attack":15,
		"counter":25,
	},
	"liveCharacters": ["game.luke", "game.obiwan", "game.sidious", "game.maul"],
	"previousAttack": 0,
	"currentAttack": 0,
	"pc": "",
	"npc":"",
	"clickCounter": 0,
	"attacker": function() {		
			//character selection
		$("#sky").click(function() {
			if (game.clickCounter === 0) {
				$("#sky").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				$(".box1").siblings().detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				game.pc = game.luke;
				game.clickCounter++;
			}else if (game.clickCounter === 1 && $("#sky").hasClass("box3")) {
				$("#sky").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.luke;
				game.clickCounter++;
			} else if (game.clickCounter === 2 && $("#sky").hasClass("box3") && $("#sky").hasClass("alive")) {
				$("#sky").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.luke;
				game.clickCounter++;
			}
		});
		$("#ken").click(function() {
		if (game.clickCounter === 0) {
				$("#ken").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				$(".box1").siblings().detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				game.pc = game.obiwan;
				game.clickCounter++;
			} else if (game.clickCounter === 1 && $("#ken").hasClass("box3")) {
				$("#ken").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.obiwan;
				game.clickCounter++;
			} else if (game.clickCounter === 2 && $("#ken").hasClass("box3") && $("#ken").hasClass("alive")) {
				$("#sky").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.ken;
				game.clickCounter++;
			}
		});
		$("#sid").click(function() {
			if (game.clickCounter === 0) {
				$("#sid").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				$(".box1").siblings().detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				game.pc = game.sidious;
				game.clickCounter++;
			} else if (game.clickCounter === 1 && $("#sid").hasClass("box3")) {
				$("#sid").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.sidious;
				game.clickCounter++;
			} else if (game.clickCounter === 2 && $("#sid").hasClass("box3") && game.liveCharacters.length === 3) {
				$("#sid").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.sidious;
				game.clickCounter++;
			} 
		});
		$("#maul").click(function() {
			if (game.clickCounter === 0) {
				$("#maul").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				$(".box1").siblings().detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				game.pc = game.maul;
				game.clickCounter++;
			} else if (game.clickCounter === 1 && $("#maul").hasClass("box3")) {
				$("#maul").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.maul;
				game.clickCounter++;
			}else if (game.clickCounter === 2 && $("#maul").hasClass("box3") && $("#maul").hasClass("alive")) {
				$("#maul").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.luke;
				game.clickCounter++;
			}
		});
	},
	
	"fight": function() {
		$("#attackButton").click(function() {
			game.currentAttack = game.pc.attack + game.previousAttack;
			game.previousAttack = game.currentAttack;
			game.pc.health = game.pc.health - game.npc.counter;
			game.npc.health = game.npc.health - game.currentAttack;
			
			$(".sidiousLifeDis").text(game.sidious.health);
			$(".lukeLifeDis").text(game.luke.health);
			$(".maulLifeDis").text(game.maul.health);
			$(".kenobiLifeDis").text(game.obiwan.health);
			if (game.pc.health <= 0) {
				$("#restart").removeClass('hidden');
				clickCounter = 3;
				$("#gameText").text('You Lose');
			} else if (game.npc.health <= 0) {
				if (game.npc === game.luke) {
					$("#sky").detach();
					game.liveCharacters.splice("game.luke",1);
					$(".box3").addClass("alive");
				} else if (game.npc === game.obiwan) {
					$("#ken").detach();
					game.liveCharacters.splice("game.obiwan",1);
					$(".box3").addClass("alive");
				} else if (game.npc === game.sidious) {
					$("#sid").detach();
					game.liveCharacters.splice("game.sidious",1);
					$(".box3").addClass("alive");
				} else if (game.npc === game.maul) {
					$("#maul").detach();
					game.liveCharacters.splice("game.maul",1);
					$(".box3").addClass("alive");
				}
			}
			if (game.liveCharacters.length === 2) {
				$(".box3").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
			}
		});
	},
}
game.attacker();
game.fight();