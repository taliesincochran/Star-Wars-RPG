$( document ).ready(function() {
	var game = {
		// characters
		"obiwan": {
			"name": "Obi-Wan Kenobi",
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
		//variables to track the increasing pc damage
		"previousAttack": 0,
		"currentAttack": 0,
		//Variables to track who is pc and who is current NPC
		"pc": "",
		"npc":"",
		//variables that track when the pc has been choosen and if an npc that is still alive has been choosen
		"hasChoosenPC":false,
		"hasChoosenNPC":false,
		"winCounter": 0,
		//variable that keeps track of side choosen
		"jedi": undefined,
		//Keeps loss sound played from happening over and over again
		"soundPlayed": false,
		//Game sounds, could use optimization
		"sound":"",
		"sounds": {
			"current": function(sound) {
				var snd1  = new Audio();
				var src1  = document.createElement("source");
				src1.type = "audio/mpeg";
				src1.src  = sound;
				snd1.appendChild(src1);
				snd1.play();
			},
			"lightSaber": {
				"fight": function () {	
					game.sound  = "assets/sounds/lightSaber/fight.mp3";
					game.sounds.current(game.sound);					
				},
				"lightSaberOn":  function () {	
					game.sound = "assets/sounds/lightSaber/lightSaberOn.mp3";
					game.sounds.current(game.sound);	
				},
			},
			//Plays when PC is selected
			"choosePc": { 
				"sky":  function () {	
					game.sound = "assets/sounds/choosePc/chooseLuke.mp3";
					game.sounds.current(game.sound);	
				},
				"ken": function () {	
					game.sound = "assets/sounds/choosePc/chooseObiwan.mp3";
					game.sounds.current(game.sound);	
				},
				"yoda": function () {	
					game.sound = "assets/sounds/choosePc/chooseYoda.mp3";
					snd3.appendChild(src3);
					snd3.play();
				},
				"sid": function (){	
					game.sound = "assets/sounds/choosePc/chooseSid.mp3";
					game.sounds.current(game.sound);
				},
				"vad": function () {	
					game.sound = "assets/sounds/choosePc/chooseVader.mp3";
					game.sounds.current(game.sound);
				},
				"maul": function () {	
					game.sound = "assets/sounds/choosePc/chooseMaul.mp3";
					game.sounds.current(game.sound);
				},			
			},
			//plays when npc is selected, dependent on who pc is
			"npcSky": {
				"sid": function () {	
					game.sound = "assets/sounds/npcLuke/pcSidNpcLuke.mp3"
					game.sounds.current(game.sound);
				},			
				"vad": function () {	
					game.sound = "assets/sounds/npcLuke/pcVaderNpcLuke.mp3"
					game.sounds.current(game.sound);
				},			
				"maul": function () {	
					game.sound = "assets/sounds/npcLuke/pcMaulNpcLuke.mp3"
					game.sounds.current(game.sound);
				},			
			},
			"npcKen": {
				"sid": function () {	
					game.sound = "assets/sounds/npcObiwan/pcSidNpcObiwan.mp3"
					game.sounds.current(game.sound);
				},			
				"vad": function () {	
					game.sound = "assets/sounds/npcObiwan/pcVaderNpcObiwan.mp3"
					game.sounds.current(game.sound);
				},			
				"maul":function () {	
					game.sound = "assets/sounds/npcObiwan/pcMaulNpcObiwan.mp3"
					game.sounds.current(game.sound);
				},			
			},
			"npcYoda": {
				"sid": function () {	
					game.sound  = "assets/sounds/npcYoda/pcSidNpcYoda.mp3"
					game.sounds.current(game.sound);
				},			
				"vad": function () {	
					game.sound  = "assets/sounds/npcYoda/pcVaderNpcYoda.mp3"
					game.sounds.current(game.sound);
				},			
				"maul":function () {	
					game.sound  = "assets/sounds/npcYoda/pcMaulNpcYoda.mp3"
					game.sounds.current(game.sound);
				},	
			},		
			"npcSid": {
				"sky": function () {	
					game.sound  = "assets/sounds/npcSid/pcLukeNpcSid.mp3"
					game.sounds.current(game.sound);
				},
				"ken": function () {	
					game.sound  = "assets/sounds/npcSid/pcObiwanNpcSid.mp3"
					game.sounds.current(game.sound);
				},
				"yoda": function () {	
					game.sound  = "assets/sounds/npcSid/pcYodaNpcSid.mp3"
					game.sounds.current(game.sound);
				},
			},
			"npcMaul": {
				"sky": function () {	
					game.sound  = "assets/sounds/npcMaul/pcLukeNpcMaul.mp3"
					game.sounds.current(game.sound);
				},
				"ken": function () {	
					game.sound  = "assets/sounds/npcMaul/pcObiwanNpcMaul.mp3"
					game.sounds.current(game.sound);
				},
				"yoda": function () {	
					game.sound  = "assets/sounds/npcMaul/pcYodaNpcMaul.mp3"
					game.sounds.current(game.sound);
				},
			},
			"npcVad" : {
				"sky": function () {	
					game.sound  = "assets/sounds/npcVader/pcLukeNpcVader.mp3"
					game.sounds.current(game.sound);
				},
				"ken": function () {	
					game.sound  = "assets/sounds/npcVader/pcObiwanNpcVader.mp3"
					game.sounds.current(game.sound);
				},
				"yoda": function () {	
					game.sound  = "assets/sounds/npcVader/pcYodaNpcVader.mp3"
					game.sounds.current(game.sound);
				},
			},
			"win" :{
				"jedi": function () {	
					game.sound = "assets/sounds/win/jediWin.mp3"
					game.sounds.current(game.sound);
				},
				"sith": function () {	
					game.sound = "assets/sounds/win/sithWin.mp3"
					game.sounds.current(game.sound);
				},
			},
			"loss" :{
				"jediLoss": function () {	
					if (!game.soundPlayed) {
						game.sound  = "assets/sounds/loss/jediLoss.mp3"
						game.sounds.current(game.sound);
						game.soundPlayed = true;
					}
				},
				"sithLoss": function () {	
					if (!game.soundPlayed) {
						game.sound  = "assets/sounds/loss/sithLoss.mp3"
						game.sounds.current(game.sound);
						game.soundPlayed = true;
					}
				},
			},

		},
		//The button hide the intro and go to the game
		"skipIntro": function() {
			$("#skipIntro").on("click", function() {
				$("#introArea").detach();
				$("#mainGame").removeClass("hidden");
				$("body").css("background-image","url(assets/images/background.png)");
				
			});
		},
		//At the end of the video, the game begins
		"endIntro":function () {
			var end = $("#video");
			end.on('ended',function (){
				$("#introArea").detach();
				$("#mainGame").removeClass("hidden");
				$("body").css("background-image","url(assets/images/background.png)");		
			});
		},
		//Allows user to choose Sith or Jedi, hides choices and reveals characters
		"chooseSide": function() {
			$("#jedi").click(function() {
				$("#sky").removeClass("hidden");
				$("#ken").removeClass("hidden");
				$("#yoda").removeClass("hidden");
				$("#sid").detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				$("#maul").detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				$("#vad").detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				$("#jedi").addClass("hidden");
				$("#sith").addClass("hidden");
				$("#chooseSide").addClass("hidden");
				$("#chooseCharacter").removeClass("hidden");
				game.jedi = true;
				game.sounds.lightSaber.lightSaberOn();
			});
			$("#sith").click(function() {
				$("#sid").removeClass("hidden");
				$("#maul").removeClass("hidden");
				$("#vad").removeClass("hidden");
				$("#ken").detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				$("#sky").detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				$("#yoda").detach().prependTo("#npcDis").removeClass("box1").addClass("box3");
				$("#jedi").addClass("hidden");
				$("#sith").addClass("hidden");
				$("#chooseCharacter").removeClass("hidden");
				game.jedi = false;	
				game.sounds.lightSaber.lightSaberOn();
			});
			
			$(".sidiousLifeDis").text(game.sidious.health);
			$(".lukeLifeDis").text(game.luke.health);
			$(".maulLifeDis").text(game.maul.health);
			$(".kenobiLifeDis").text(game.obiwan.health);
			$(".yodaLifeDis").text(game.yoda.health);
			$(".vaderLifeDis").text(game.vader.health);
		},
		// function that runs to choose character and opponent 
		"attacker": function() {		
				//character selection
			var choosePc = function () {
				$(".box1").siblings().addClass('hidden');
				$("#chooseCharacter").addClass("hidden");
				$("#yourChar").removeClass("hidden");
				game.hasChoosenPC = true;
				$("#enemiesAvailable").removeClass("hidden");
				$("#attackButton").removeClass("hidden");
				$("#changeTarget").removeClass("hidden");
				$("#fight").removeClass("hidden");
				if (!game.jedi) {
					$("#ken").removeClass("hidden");
					$("#sky").removeClass("hidden");
					$("#yoda").removeClass("hidden");
					$("#gameText").html("Jedi scum have infiltrated your lair!");
				}
				if (game.jedi) {
					$("#sid").removeClass("hidden");
					$("#vad").removeClass("hidden");
					$("#maul").removeClass("hidden");
					$("#gameText").html("The Sith are here to attack!");
				}
			};
			var chooseNPC = function () {

				game.hasChoosenNPC = true;
					$("#gameText").text("");
					$("#defender").removeClass("hidden");
					if (game.winCounter === 2 && game.hasChoosenNPC) {
					$("#enemiesAvailable").addClass("hidden");
				}
			};
			$("#sky").click(function() {
				if ($("#sky").hasClass("box1")) {
					 $("#sky").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
					game.pc = game.luke;
					choosePc();
					game.sounds.choosePc.sky();
				} else if ($("#sky").hasClass("box3") && !game.hasChoosenNPC && game.hasChoosenPC) {
					$("#sky").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
					game.npc = game.luke;		
					chooseNPC();
					if (game.pc === game.sidious) {
						game.sounds.npcSky.sid();
					} else if (game.pc === game.maul) {
						game.sounds.npcSky.maul();
					} else if (game.pc === game.vader) {
						game.sounds.npcSky.vad();
					} 
					
				}
			});
			$("#ken").click(function() {
				if ($("#ken").hasClass("box1")) {
					$("#ken").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
					game.pc = game.obiwan;
					choosePc();
					game.sounds.choosePc.ken();
				} else if ($("#ken").hasClass("box3") && !game.hasChoosenNPC && game.hasChoosenPC) {
					$("#ken").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
					game.npc = game.obiwan;			
					chooseNPC();
					if (game.pc === game.sidious) {
						game.sounds.npcKen.sid();
					} else if (game.pc === game.maul) {
						game.sounds.npcKen.maul();
					} else if (game.pc === game.vader) {
						game.sounds.npcKen.vad();
					} 
				}
			});
			$("#yoda").click(function() {
				if ($("#yoda").hasClass("box1")) {
					$("#yoda").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
					game.pc = game.yoda;
					choosePc();
					game.sounds.choosePc.yoda();
				} else if ($("#yoda").hasClass("box3") && !game.hasChoosenNPC && game.hasChoosenPC) {
					$("#yoda").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
					game.npc = game.yoda;			
					chooseNPC();
					if (game.pc === game.sidious) {
						game.sounds.npcYoda.sid();
					} else if (game.pc === game.maul) {
						game.sounds.npcYoda.maul();
					} else if (game.pc === game.vader) {
						game.sounds.npcYoda.vad();
					} 
				}
			});
			$("#sid").click(function() {			
				if ($("#sid").hasClass("box1")) {
					$("#sid").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
					game.pc = game.sidious;	
					choosePc();	
					game.sounds.choosePc.sid();
				} else if ($("#sid").hasClass("box3") && !game.hasChoosenNPC && game.hasChoosenPC) {
					$("#sid").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
					game.npc = game.sidious;				
					chooseNPC();
					if (game.pc === game.luke) {
						game.sounds.npcSid.sky();
					} else if (game.pc === game.obiwan) {
						game.sounds.npcSid.ken();
					} else if (game.pc === game.yoda) {
						game.sounds.npcSid.yoda();
					} 
				}
			});
			$("#maul").click(function() {
				if ($("#maul").hasClass("box1")) {
					$("#maul").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
					game.pc = game.maul;
					choosePc();
					game.sounds.choosePc.maul();
				} else if ($("#maul").hasClass("box3") && !game.hasChoosenNPC && game.hasChoosenPC) {
					$("#maul").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
					game.npc = game.maul;				
					chooseNPC();
					if (game.pc === game.luke) {
						game.sounds.npcMaul.sky();
					} else if (game.pc === game.obiwan) {
						game.sounds.npcMaul.ken();
					} else if (game.pc === game.yoda) {
						game.sounds.npcMaul.yoda();
					} 
				}
			});
			$("#vad").click(function() {
				if ($("#vad").hasClass("box1")) {
					$("#vad").detach().prependTo("#pcDis").removeClass("box1").addClass("box2");
					game.pc = game.vader;
					choosePc();
					game.sounds.choosePc.vad();
				} else if ($("#vad").hasClass("box3") && !game.hasChoosenNPC && game.hasChoosenPC) {
					$("#vad").detach().prependTo("#npcDefenderDis").removeClass("box3").addClass("box4");
					game.npc = game.vader;			
					chooseNPC();
					if (game.pc === game.luke) {
						game.sounds.npcVad.sky();
					} else if (game.pc === game.obiwan) {
						game.sounds.npcVad.ken();
					} else if (game.pc === game.yoda) {
						game.sounds.npcVad.yoda();
					} 
				}
			});
		},
		// Function that runs when attack button is pressed.  Determines and displays damage, determines death
		"fight": function() {
			$("#attackButton").click(function() {
				if (game.hasChoosenNPC) {
					game.sounds.lightSaber.fight();
					game.currentAttack = game.pc.attack + game.previousAttack;
					game.previousAttack = game.currentAttack;
					if(game.pc.health > 0 && game.npc.health > 0) {
						game.npc.health = game.npc.health - game.currentAttack;
						if(game.npc.health > 0) {
							game.pc.health = game.pc.health - game.npc.counter;
						}
						$("#gameText").html("You attacked " + " " + game.npc.name + " " + "for " +  "<span class='red'>" + game.currentAttack + "</span> damage. <br>" + game.npc.name + " " + "attacks you back for <span class= 'red'> " + game.npc.counter + "</span> damage.");
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
				// determines loss condition
				var pcDeath = function () {
					$("#restart").removeClass('hidden');
					game.hasChoosenNPC = false;
					if (game.jedi) {
						$("#gameText").html("The Sith have won!<br>The galaxy will suffer...<br>Some Jedi you turned out to be.<br> GAME OVER!!!");
						game.sounds.loss.jediLoss();
					}
					if(!game.jedi) {
						$("#gameText").html("The Jedi have won!<br>What type of miserable excuse for a Sith are you?<br>GAME OVER!!!");
						game.sounds.loss.sithLoss();
					}
				}
				if (game.pc.health <= 0) {			
					pcDeath();
				} else if (game.pc.health <= 0 && game.npc.health <= 0) {
					npcDeath();
					pcDeath();
				} else if (game.npc.health <= 0 && game.npc !== undefined) {
					$("#gameText").html("You have defeated <span class='blue'>" + game.npc.name + "</span>, you can choose to fight another.");
					npcDeath();
					game.winCounter++;	
				}
				// determines win condition
				if (game.winCounter === 3) {
					$("#restart").removeClass("hidden");
					$("#defender").addClass("hidden");
					$("#fight").addClass("hidden");
					$("#attackButton").addClass("hidden");
					$("#changeTarget").addClass("hidden");
					$("#defender").addClass("hidden");
					if (game.jedi) {
						$("#gameText").html("The Sith have been defeated!<br>The galaxy may once again prosper.<br>Play again?");
						game.sounds.win.jedi();
					}
					if(!game.jedi) {
						$("#gameText").html("The Jedi have been defeated!<br>Nothing can stop the Sith from galactic domination!<br>Play again?");
						game.sounds.win.sith();
					}
				}
			});
		},
		//function that runs when change target button is pressed
		"changeCurrentTarget": function() {
			$("#changeTarget").click(function() {
				if (game.hasChoosenNPC) {
					$(".box4").detach().removeClass("box4").addClass("box3").appendTo("#npcDis");
					game.hasChoosenNPC = false;
				}
			});
		},
		// Runs when restart button is pressed. Resets variables, classes and initial positions
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
				game.jedi = undefined;
				game.soundPlayed = false;
				$("#gameText").text("");
				$("#ken").detach().removeClass("box1 box2 box3 box4").addClass("box1 hidden").prependTo("#characters");
				$("#sky").detach().removeClass("box1 box2 box3 box4").addClass("box1 hidden").prependTo("#characters");
				$("#yoda").detach().removeClass("box1 box2 box3 box4").addClass("box1 hidden").prependTo("#characters");
				$("#sid").detach().removeClass("box1 box2 box3 box4").addClass("box1 hidden").prependTo("#characters");
				$("#maul").detach().removeClass("box1 box2 box3 box4").addClass("box1 hidden").prependTo("#characters");
				$("#vad").detach().removeClass("box1 box2 box3 box4").addClass("box1 hidden").prependTo("#characters");
				$("#jedi").removeClass("hidden");
				$("#sith").removeClass("hidden");
				$("#yourChar").addClass("hidden");
				$("#defender").addClass("hidden");
				$("#fight").addClass("hidden");
				$("#attackButton").addClass("hidden");
				$("#changeTarget").addClass("hidden");
				$("#chooseSide").removeClass("hidden");
				$("#restart").addClass("hidden");
				$("#enemiesAvailable").addClass("hidden");
				$(".sidiousLifeDis").text(game.sidious.health);
				$(".lukeLifeDis").text(game.luke.health);
				$(".maulLifeDis").text(game.maul.health);
				$(".vaderLifeDis").text(game.vader.health);
				$(".kenobiLifeDis").text(game.obiwan.health);
				$(".yodaLifeDis").text(game.yoda.health);

			});

		},
	}
	// functions that start intro, game, and buttons
	game.skipIntro();
	game.endIntro();
	game.chooseSide();
	game.attacker();
	game.fight();
	game.changeCurrentTarget();
	game.restart();
});

