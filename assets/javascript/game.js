var game = {
	// characters
	"obiwan": {
		"name": "Obiwan vadobi",
		"health":120,
		"attack":8,
		"counter":16,
	},
	"luke": {
		"name": "Luke Skywalker",
		"health":100,
		"attack":16,
		"counter":5,
	},
	"yoda": {
		"name": "Yoda",
		"health":200,
		"attack":5,
		"counter":29,
	},
	"sidious": {
		"name": "Darth Sidious",
		"health":150,
		"attack":5,
		"counter":20,
	},
	"maul": {
		"name": "Darth Maul",
		"health":180,
		"attack":4,
		"counter":25,
	},
	"vader": {
		"name": "Darth Vader",
		"health":90,
		"attack":15,
		"counter":5,
	},
	"previousAttack": 0,
	"currentAttack": 0,
	"pc": "",
	"npc":"",
	"hasChoosenPC":false,
	"hasChoosenNPC":false,
	"winCounter": 0,
	"vaderCount": 0,
	"vaderSprite": ["assets/images/vaderSprites/156.png,", "assets/images/vaderSprites/157.png,", "assets/images/vaderSprites/158.png,", "assets/images/vaderSprites/159.png,", "assets/images/vaderSprites/160.png,", "assets/images/vaderSprites/161.png,", "assets/images/vaderSprites/162.png,", "assets/images/vaderSprites/163.png,", "assets/images/vaderSprites/164.png,", "assets/images/vaderSprites/165.png,", "assets/images/vaderSprites/166.png,", "assets/images/vaderSprites/167.png,", "assets/images/vaderSprites/168.png,", "assets/images/vaderSprites/169.png,", "assets/images/vaderSprites/170.png,", "assets/images/vaderSprites/171.png,", "assets/images/vaderSprites/172.png"],
	"vaderImage": function () {
		$("#pcHolder").html("<img src=" + images[game.vaderCount] + " width='100px'>");
	},
	"vaderAnimation" : function() {
		var i;
		var l = game.vaderSprite.length;
		for (i=0; i > l; i++) {
			vaderImage();
			game.vaderCount++;
			setTimeout(game.vaderImage, 1000);
			if (count === game.vaderSprite.length) {
	    		count = 0;
  			}
		}
	},
	chooseSide: function() {
		$("#jedi").click(function() {
			$("#sky").removeClass("hidden");
			$("#ken").removeClass("hidden");
			$("#yoda").removeClass("hidden");
			$("#sid").detach().prependTo("#npcDis").removeClass("box1 hidden").addClass("box3");
			$("#maul").detach().prependTo("#npcDis").removeClass("box1 hidden").addClass("box3");
			$("#vad").detach().prependTo("#npcDis").removeClass("box1 hidden").addClass("box3");
			$("#jedi").addClass("hidden");
			$("#sith").addClass("hidden");
			$("#chooseSide").addClass("hidden");
			$("#chooseCharacter").removeClass("hidden");
		});
		$("#sith").click(function() {
			$("#sid").removeClass("hidden");
			$("#maul").removeClass("hidden");
			$("#vad").removeClass("hidden");
			$("#ken").detach().prependTo("#npcDis").removeClass("box1 hidden").addClass("box3");
			$("#sky").detach().prependTo("#npcDis").removeClass("box1 hidden").addClass("box3");
			$("#yoda").detach().prependTo("#npcDis").removeClass("box1 hidden").addClass("box3");
			$("#jedi").addClass("hidden");
			$("#sith").addClass("hidden");
			$("#chooseCharacter").removeClass("hidden");
		});
		$(".sidiousLifeDis").text(game.sidious.health);
		$(".lukeLifeDis").text(game.luke.health);
		$(".maulLifeDis").text(game.maul.health);
		$(".kenobiLifeDis").text(game.obiwan.health);
		$(".yodaLifeDis").text(game.yoda.health);
		$(".vaderLifeDis").text(game.vader.health);
	},
	"attacker": function() {		
			//character selection
		var choosePc = function () {
			$(".box1").siblings().addClass('hidden');
			$("#chooseCharacter").addClass("hidden");
			$("yourChar").removeClass("hidden");
			game.hasChoosenPC = true;
		};
		var chooseNPC = function () {
			game.hasChoosenNPC = true;
				$("#gameText").text("");
		};
		$("#sky").click(function() {
			if ($("#sky").hasClass("box1")) {
				$("#sky").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				game.pc = game.luke;
				choosePc();
			} else if ($("#sky").hasClass("box3") && game.hasChoosenNPC === false && game.hasChoosenPC === true) {
				$("#sky").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.luke;		
				chooseNPC();
				
			}
		});
		$("#ken").click(function() {
			if ($("#ken").hasClass("box1")) {
				$("#ken").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				game.pc = game.obiwan;
				choosePc();
			} else if ($("#ken").hasClass("box3") && game.hasChoosenNPC === false && game.hasChoosenPC === true) {
				$("#ken").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.obiwan;			
				chooseNPC();
			}
		});
		$("#yoda").click(function() {
			if ($("#yoda").hasClass("box1")) {
				$("#yoda").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				game.pc = game.yoda;
				choosePc();
			} else if ($("#yoda").hasClass("box3") && game.hasChoosenNPC === false && game.hasChoosenPC === true) {
				$("#yoda").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.yoda;			
				chooseNPC();
			}
		});
		$("#sid").click(function() {			
			if ($("#sid").hasClass("box1")) {
				$("#sid").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				game.pc = game.sidious;	
				choosePc();	
			} else if ($("#sid").hasClass("box3") && game.hasChoosenNPC === false && game.hasChoosenPC === true) {
				$("#sid").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.sidious;				
				chooseNPC();
			}
		});
		$("#maul").click(function() {
			if ($("#maul").hasClass("box1")) {
				$("#maul").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				game.pc = game.maul;
				choosePc();
			} else if ($("#maul").hasClass("box3") && game.hasChoosenNPC === false && game.hasChoosenPC === true) {
				$("#maul").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.maul;				
				chooseNPC();
			}
		});
		$("#vad").click(function() {
			if ($("#vad").hasClass("box1")) {
				$("#vad").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
				game.pc = game.vader;
				choosePc();
			} else if ($("#vad").hasClass("box3") && game.hasChoosenNPC === false && game.hasChoosenPC === true) {
				$("#vad").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
				game.npc = game.vader;			
				chooseNPC();
				game.vaderAnimation();
			}
		});
	},
	
	"fight": function() {
		$("#attackButton").click(function() {
			if (game.hasChoosenNPC === true) {
				game.currentAttack = game.pc.attack + game.previousAttack;
				game.previousAttack = game.currentAttack;
				if(game.pc.health > 0 && game.npc.health > 0) {
					game.npc.health = game.npc.health - game.currentAttack;
					if(game.npc.health > 0) {
						game.pc.health = game.pc.health - game.npc.counter;
					}
					$("#gameText").html("You attacked " + game.npc.name + "for " + game.currentAttack + " damage. <br>" + game.npc.name + " attacks you back for " + game.npc.counter + " damage.");
					$(".sidiousLifeDis").text(game.sidious.health);
					$(".lukeLifeDis").text(game.luke.health);
					$(".maulLifeDis").text(game.maul.health);
					$(".kenobiLifeDis").text(game.obiwan.health);
					$(".yodaLifeDis").text(game.yoda.health);
					$(".vaderLifeDis").text(game.vader.health);
				}
			}
		var npcDeath = function () {
			if (game.npc === game.luke) {
				$("#sky").addClass("hidden box1").removeClass("box4");
			} else if (game.npc === game.obiwan) {
				$("#ken").addClass("hidden box1").removeClass("box4");
			} else if (game.npc === game.yoda) {
				$("#yoda").addClass("hidden box1").removeClass("box4");
			} else if (game.npc === game.sidious) {
				$("#sid").addClass("hidden box1").removeClass("box4");
			} else if (game.npc === game.maul) {
				$("#maul").addClass("hidden box1").removeClass("box4");
			} else if (game.npc === game.vader) {
				$("#vad").addClass("hidden box1").removeClass("box4");
			}
			game.npc = undefined;
			game.hasChoosenNPC = false;
		};
		var pcDeath = function () {
			$("#restart").removeClass('hidden');
			$("#gameText").text("You've been defeated... GAME OVER!!!");
			game.hasChoosenNPC = false;
		}
		if (game.pc.health <= 0) {			
			pcDeath();
		} else if (game.pc.health <= 0 && game.npc.health <= 0) {
			npcDeath();
			pcDeath();
		} else if (game.npc.health <= 0 && game.npc !== undefined) {
			$("#gameText").html("You have defeated " + game.npc.name + ", you can choose to fight another.");
			npcDeath();
			game.winCounter++;	
		}
		if (game.winCounter === 3) {
			$("#gameText").html("You Won!!! GAME OVER!!!");
			$("#restart").removeClass("hidden");
		}
		});
	},
	'restart': function () {
		$("#restart").on("click", function () {
			game.obiwan.health = 120;
			game.luke.health = 100;
			game.sidious.health = 150;
			game.maul.health = 180;
			game.yoda.health = 200;
			game.vader.health = 90
			game.previousAttack = 0;
			game.currentAttack = 0;
		 	game.pc = "";
			game.npc ="";
			game.hasChoosenNPC = false;
			game.winCounter = 0;
			$("#gameText").text("");
			$("#ken").detach().removeClass("box1 box2 box3 box4").addClass("box1 hidden").prependTo("#characters");
			$("#sky").detach().removeClass("box1 box2 box3 box4").addClass("box1 hidden").prependTo("#characters");
			$("#yoda").detach().removeClass("box1 box2 box3 box4").addClass("box1 hidden").prependTo("#characters");
			$("#sid").detach().removeClass("box1 box2 box3 box4").addClass("box1 hidden").prependTo("#characters");
			$("#maul").detach().removeClass("box1 box2 box3 box4").addClass("box1 hidden").prependTo("#characters");
			$("#vad").detach().removeClass("box1 box2 box3 box4").addClass("box1 hidden").prependTo("#characters");
			$("#jedi").removeClass("hidden");
			$("#sith").removeClass("hidden");
			$("#chooseSide").removeClass("hidden");
			$("#restart").addClass("hidden");
			$(".sidiousLifeDis").text(game.sidious.health);
			$(".lukeLifeDis").text(game.luke.health);
			$(".maulLifeDis").text(game.maul.health);
			$(".vaderLifeDis").text(game.vader.health);
			$(".kenobiLifeDis").text(game.obiwan.health);
			$(".yodaLifeDis").text(game.yoda.health);

		});

	},
}
game.chooseSide();
game.attacker();
game.fight();
game.restart();


