var game = {
	// characters
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
				game.flag = false;
			}else if (game.clickCounter === 1 && $("#sky").hasClass("box3")) {
				$("#sky").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.luke;
				game.clickCounter++;
				game.flag = true;
			} else if (game.clickCounter === 2 && $("#sky").hasClass("box3") && $("#sky").hasClass("alive")) {
				$("#sky").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.luke;
				game.clickCounter++;
				game.flag = true;
			}
		});
		$("#ken").click(function() {
			if (game.clickCounter === 0) {
				$("#ken").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				$(".box1").siblings().detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				game.pc = game.obiwan;
				game.clickCounter++;
				game.flag = false;
			} else if (game.clickCounter === 1 && $("#ken").hasClass("box3")) {
				$("#ken").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.obiwan;
				game.clickCounter++;
				game.flag = true;
			} else if (game.clickCounter === 2 && $("#ken").hasClass("box3") && $("#ken").hasClass("alive")) {
				$("#ken").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.obiwan;
				game.clickCounter++;
				game.flag = true;
			}
		});
		$("#sid").click(function() {
			
			if (game.clickCounter === 0) {
				$("#sid").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				$(".box1").siblings().detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				game.pc = game.sidious;
				game.clickCounter++;
				game.flag = false;
			} else if (game.clickCounter === 1 && $("#sid").hasClass("box3")) {
				$("#sid").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.sidious;
				game.clickCounter++;
				game.flag = true;
			} else if (game.clickCounter === 2 && $("#sid").hasClass("box3") && $("#sid").hasClass("alive")) {
				$("#sid").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.sidious;
				game.clickCounter++;
				game.flag = true
			} 
		});
		$("#maul").click(function() {
			if (game.clickCounter === 0) {
				$("#maul").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				$(".box1").siblings().detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				game.pc = game.maul;
				game.clickCounter++;
				game.flag = false;
			} else if (game.clickCounter === 1 && $("#maul").hasClass("box3")) {
				$("#maul").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.maul;
				game.clickCounter++;
				game.flag = true;
			}else if (game.clickCounter === 2 && $("#maul").hasClass("box3") && $("#maul").hasClass("alive")) {
				$("#maul").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.maul;
				game.clickCounter++;
				game.flag = true;
			}
		});
	},
	
	"fight": function() {
		$("#attackButton").click(function() {
			if (game.flag === true) {
				game.currentAttack = game.pc.attack + game.previousAttack;
				game.previousAttack = game.currentAttack;
				if(game.pc.health > 0 && game.npc.health > 0) {
					game.npc.health = game.npc.health - game.currentAttack;
				}
				if (game.npc.health > 0 && game.npc.health > 0) {
					game.pc.health = game.pc.health - game.npc.counter;
				}
				$("#gameText").html("You attacked " + game.npc.name + "for " + game.currentAttack + "damage. <br>" + game.npc.name + "attacks you back for " + game.npc.counter + "damage.");
				$(".sidiousLifeDis").text(game.sidious.health);
				$(".lukeLifeDis").text(game.luke.health);
				$(".maulLifeDis").text(game.maul.health);
				$(".kenobiLifeDis").text(game.obiwan.health);
			}
		});
		if (game.pc.health <= 0) {
			game.flag = false
			$("#restart").removeClass('hidden');
				$("#gameText").text("You've been defeated... GAME OVER!!!");
		} else if (game.npc.health <= 0) {
			if (game.npc === game.luke) {
				$("#sky").addClass("hidden box1").removeClass("box4 alive");
					game.liveCharacters.splice("game.luke",1);
					$(".box3").addClass("alive");
					game.flag = false;
			} else if (game.npc === game.obiwan) {
				$("#ken").addClass("hidden box1").removeClass("box4 alive");
				game.liveCharacters.splice("game.obiwan",1);
				$(".box3").addClass("alive");
				game.flag = false;
			} else if (game.npc === game.sidious) {
				$("#sid").addClass("hidden box1").removeClass("box4 alive");
				game.liveCharacters.splice("game.sidious",1);
				$(".box3").addClass("alive");
				game.flag = false;
			} else if (game.npc === game.maul) {
				$("#maul").addClass("hidden box1").removeClass("box4 alive");
				game.liveCharacters.splice("game.maul",1);
				$(".box3").addClass("alive");
				game.flag = false;
			}
			$("#gameText").html("You have defeated " + game.npc.name + ", you can choose to fight another.");
		}
		if (game.liveCharacters.length === 2) {
			$(".box3").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
			if($(".box4").hasClass("lukeSky")) {
				game.npc = game.luke;
				game.flag = true;
			} else if($(".box4").hasClass("obiwanKen")) {
				game.npc = game.obiwan;
				game.flag = true;
			} else if($(".box4").hasClass("darthSid")) {
				game.npc = game.sidious;
				game.flag = true;
			} else if($(".box4").hasClass("darthMaul")) {
				game.npc = game.maul;
				game.flag = true;
			}  
		}
		if (game.liveCharacters.length === 1) {
			$("#gameText").html("You Won!!! GAME OVER!!!");
			game.flag = false;
			$("#restart").removeClass("hidden");
		}
	},
	'restart': function () {
		$("#restart").on("click", function () {
			game.obiwan.health = 120;
			game.luke.health = 100;
			game.sidious.health = 150;
			game.maul.health = 180;
			game.liveCharacters = ["game.luke", "game.obiwan", "game.sidious", "game.maul"];
			game.previousAttack = 0;
			game.currentAttack = 0;
		 	game.pc = "";
			game.npc ="";
			game.clickCounter = 0;
			flag = false;
			$("#sky").detach().removeClass("alive box2 box3 box4 hidden").addClass("box1").appendTo("#characters");
			$("#ken").detach().removeClass("alive box2 box3 box4 hidden").addClass("box1").appendTo("#characters");
			$("#sid").detach().removeClass("alive box2 box3 box4 hidden").addClass("box1").appendTo("#characters");
			$("#maul").detach().removeClass("alive box2 box3 box4 hidden").addClass("box1").appendTo("#characters");
			$("#restart").addClass("hidden");
			$(".sidiousLifeDis").text(game.sidious.health);
			$(".lukeLifeDis").text(game.luke.health);
			$(".maulLifeDis").text(game.maul.health);
			$(".kenobiLifeDis").text(game.obiwan.health);
		});

	},
}
game.attacker();
game.fight();
game.restart();