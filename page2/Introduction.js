(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Introduction_atlas_P_1", frames: [[0,1035,863,357],[1108,0,477,1048],[0,0,1106,1033],[865,1050,499,249]]},
		{name:"Introduction_atlas_NP_1", frames: [[1502,0,1500,1100],[0,1199,1500,1067],[0,0,1500,1197],[3004,0,1024,1024],[1502,1102,1280,1280],[1026,2384,579,360],[3004,1026,1024,1024],[2784,2052,1024,1024],[0,2268,1024,1024],[3810,2052,270,600],[1607,2384,270,600],[1879,2384,270,600],[2151,2384,270,600],[2423,2384,270,600],[3810,2654,270,600],[1026,2746,270,600],[1298,2746,270,600],[1570,2986,270,600],[1842,2986,270,600],[2114,2986,270,600],[2386,2986,270,600],[2658,3078,270,600],[2930,3078,620,152]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib._11_1Ki_17_12_RG = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._11_1Ki_18_02_RG = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib._42_Lk_17_03a_RG = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Africanmantalkingtopastor = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.AudioWave1 = function() {
	this.initialize(ss["Introduction_atlas_P_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Default_A_young_African_man_likely_in_his_early_twenties_with_0 = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.grades2570451_640 = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Leonardo_Phoenix_A_closely_framed_portrait_of_two_individuals_3 = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Leonardo_Phoenix_A_young_African_man_likely_in_his_early_twent_0 = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Leonardo_Phoenix_An_African_story_teller_is_telling_a_story_to_1 = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.PhaseDropdownFullsize = function() {
	this.initialize(ss["Introduction_atlas_P_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20240809_165933_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20240903_150023_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20240916_163055_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20240918_141851_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20240918_142121_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20240926_133120_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20240926_133251_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20240930_171007_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20240930_171056_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20240930_171115_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20241010_150419_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20241010_150441_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot_20241010_150458_StoryProducer = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.StoryProducerLogonotextMarch2024_Currentfavorite02 = function() {
	this.initialize(ss["Introduction_atlas_P_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.StoryProducerWordsonly_Wordsonly_Small = function() {
	this.initialize(ss["Introduction_atlas_P_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.StoryPagesTogetherLtoR = function() {
	this.initialize(ss["Introduction_atlas_NP_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.Tween3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._11_1Ki_17_12_RG();
	this.instance.setTransform(-135,-99,0.18,0.18);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-135,-99,270,198);


(lib.Tween1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._11_1Ki_18_02_RG();
	this.instance.setTransform(-216.65,-154.1,0.2889,0.2889);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-216.6,-154.1,433.29999999999995,308.2);


(lib.JesuswLeper = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._42_Lk_17_03a_RG();
	this.instance.setTransform(-135.25,-107.95,0.1804,0.1804);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-135.2,-107.9,270.5,215.9);


(lib.Finalize = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Screenshot_20240918_141851_StoryProducer();
	this.instance.setTransform(-135,-300);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-135,-300,270,600);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween1("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-216.6,-154.1,433.29999999999995,308.2);


(lib.Elijah1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween3("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-135,-99,270,198);


// stage content:
(lib.Introduction = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"  1   Welcome to Story Producer":8,"   2   This app will help you translate Bible stories":54,"   3   or Bloom Books":130,"   4   and create simple videos in your language":168,"   5   Tell the people from Israel to meet me on Mount Carmel":240,"   6   Immediately the leprosy disappeared, and the man was healed":324,"   7   Story Producer will help you create videos like this by guiding you through 7 steps we call Phases":382,"    8   The LEARN phase will help you learn the story well so you can create a good translation":553,"    9   In the TRANSLATE & REVISE phase":683,"    10 you will listen to the story in one language and record an audio translation in your language":739,"    11 In the COMMUNITY WORK phase":893,"    12 others who speak your language will listen to your translation and give you feedback on how to improve it":940,"    13 In the ACCURACY CHECK phase":1090,"    14 you will ask a Bible teacher to make sure your translation tells the story accurately":1140,"    15   In the VOICE STUDIO phase":1259,"    16 you will ask a good storyteller to re-record the story":1302,"    17   In the FINALIZE phase, Story Producer will combine your recording with the images and music provided by the app to create your video":1401,"    18 When the video is complete, you can use the SHARE phase to share the video with your friends":1609,"    19 The first time you open Story Producer, you will notice a blue tutorial window":1749,"    20 Each time a new tutorial window appears, read it and do what it says":1889,"    21 The app will guide you through the process to translate and create your first Bible Story Video":2006};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,8,54,130,168,245,328,382,553,683,739,893,940,1090,1140,1259,1302,1401,1609,1749,1889,2006];
	this.streamSoundSymbolsList[8] = [{id:"_1WelcometoStoryProducer",startFrame:8,endFrame:54,loop:1,offset:0}];
	this.streamSoundSymbolsList[54] = [{id:"_2ThisappwillhelpyoutranslateBiblestories",startFrame:54,endFrame:130,loop:1,offset:0}];
	this.streamSoundSymbolsList[130] = [{id:"_3orBloomBooks",startFrame:130,endFrame:168,loop:1,offset:0}];
	this.streamSoundSymbolsList[168] = [{id:"_4andcreatesimplevideosinyourlanguage",startFrame:168,endFrame:382,loop:1,offset:0}];
	this.streamSoundSymbolsList[245] = [{id:"ElijahandWidowtalkingtoKingwav",startFrame:245,endFrame:328,loop:1,offset:0}];
	this.streamSoundSymbolsList[328] = [{id:"KarenJesusHealsLeperwav",startFrame:328,endFrame:2160,loop:1,offset:0}];
	this.streamSoundSymbolsList[382] = [{id:"_7StoryProducerwillhelpyoucreatevideoslikethisbyguidingyouthrough7stepswecallPhases",startFrame:382,endFrame:553,loop:1,offset:0}];
	this.streamSoundSymbolsList[553] = [{id:"_8TheLEARNphasewillhelpyoulearnthestorywellsoyoucancreateagoodtranslation",startFrame:553,endFrame:683,loop:1,offset:0}];
	this.streamSoundSymbolsList[683] = [{id:"_9IntheTRANSLATEREVISEphase",startFrame:683,endFrame:739,loop:1,offset:0}];
	this.streamSoundSymbolsList[739] = [{id:"_10youwilllistentothestoryinonelanguageandrecordanaudiotranslationinyourlanguage",startFrame:739,endFrame:893,loop:1,offset:0}];
	this.streamSoundSymbolsList[893] = [{id:"_11IntheCOMMUNITYWORKphase",startFrame:893,endFrame:940,loop:1,offset:0}];
	this.streamSoundSymbolsList[940] = [{id:"_12otherswhospeakyourlanguagewilllistentoyourtranslationandgiveyoufeedbackonhowtoimproveit",startFrame:940,endFrame:1090,loop:1,offset:0}];
	this.streamSoundSymbolsList[1090] = [{id:"_13IntheACCURACYCHECKphase",startFrame:1090,endFrame:1140,loop:1,offset:0}];
	this.streamSoundSymbolsList[1140] = [{id:"_14youwillaskaBibleteachertomakesureyourtranslationtellsthestoryaccurately",startFrame:1140,endFrame:1259,loop:1,offset:0}];
	this.streamSoundSymbolsList[1259] = [{id:"_15IntheVOICESTUDIOphase",startFrame:1259,endFrame:1302,loop:1,offset:0}];
	this.streamSoundSymbolsList[1302] = [{id:"_16youwillaskagoodstorytellertorerecordthestory",startFrame:1302,endFrame:1401,loop:1,offset:0}];
	this.streamSoundSymbolsList[1401] = [{id:"_17IntheFINALIZEphaseStoryProducerwillcombineyourrecordingwiththeimagesandmusicprovidedbytheapptocreateyourvideo",startFrame:1401,endFrame:1609,loop:1,offset:0}];
	this.streamSoundSymbolsList[1609] = [{id:"_18WhenthevideoiscompleteyoucanusetheSHAREphasetosharethevideowithyourfriends",startFrame:1609,endFrame:1749,loop:1,offset:0}];
	this.streamSoundSymbolsList[1749] = [{id:"_19ThefirsttimeyouopenStoryProduceryouwillnoticeabluetutorialwindow",startFrame:1749,endFrame:1889,loop:1,offset:0}];
	this.streamSoundSymbolsList[1889] = [{id:"_20Eachtimeanewtutorialwindowappearsreaditanddowhatitsays",startFrame:1889,endFrame:2006,loop:1,offset:0}];
	this.streamSoundSymbolsList[2006] = [{id:"_21TheappwillguideyouthroughtheprocesstotranslateandcreateyourfirstBibleStoryVideo",startFrame:2006,endFrame:2160,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_8 = function() {
		var soundInstance = playSound("_1WelcometoStoryProducer",0);
		this.InsertIntoSoundStreamData(soundInstance,8,54,1);
	}
	this.frame_54 = function() {
		var soundInstance = playSound("_2ThisappwillhelpyoutranslateBiblestories",0);
		this.InsertIntoSoundStreamData(soundInstance,54,130,1);
	}
	this.frame_130 = function() {
		var soundInstance = playSound("_3orBloomBooks",0);
		this.InsertIntoSoundStreamData(soundInstance,130,168,1);
	}
	this.frame_168 = function() {
		var soundInstance = playSound("_4andcreatesimplevideosinyourlanguage",0);
		this.InsertIntoSoundStreamData(soundInstance,168,382,1);
	}
	this.frame_245 = function() {
		var soundInstance = playSound("ElijahandWidowtalkingtoKingwav",0);
		this.InsertIntoSoundStreamData(soundInstance,245,328,1);
	}
	this.frame_328 = function() {
		var soundInstance = playSound("KarenJesusHealsLeperwav",0);
		this.InsertIntoSoundStreamData(soundInstance,328,2160,1);
	}
	this.frame_382 = function() {
		var soundInstance = playSound("_7StoryProducerwillhelpyoucreatevideoslikethisbyguidingyouthrough7stepswecallPhases",0);
		this.InsertIntoSoundStreamData(soundInstance,382,553,1);
	}
	this.frame_553 = function() {
		var soundInstance = playSound("_8TheLEARNphasewillhelpyoulearnthestorywellsoyoucancreateagoodtranslation",0);
		this.InsertIntoSoundStreamData(soundInstance,553,683,1);
	}
	this.frame_683 = function() {
		var soundInstance = playSound("_9IntheTRANSLATEREVISEphase",0);
		this.InsertIntoSoundStreamData(soundInstance,683,739,1);
	}
	this.frame_739 = function() {
		var soundInstance = playSound("_10youwilllistentothestoryinonelanguageandrecordanaudiotranslationinyourlanguage",0);
		this.InsertIntoSoundStreamData(soundInstance,739,893,1);
	}
	this.frame_893 = function() {
		var soundInstance = playSound("_11IntheCOMMUNITYWORKphase",0);
		this.InsertIntoSoundStreamData(soundInstance,893,940,1);
	}
	this.frame_940 = function() {
		var soundInstance = playSound("_12otherswhospeakyourlanguagewilllistentoyourtranslationandgiveyoufeedbackonhowtoimproveit",0);
		this.InsertIntoSoundStreamData(soundInstance,940,1090,1);
	}
	this.frame_1090 = function() {
		var soundInstance = playSound("_13IntheACCURACYCHECKphase",0);
		this.InsertIntoSoundStreamData(soundInstance,1090,1140,1);
	}
	this.frame_1140 = function() {
		var soundInstance = playSound("_14youwillaskaBibleteachertomakesureyourtranslationtellsthestoryaccurately",0);
		this.InsertIntoSoundStreamData(soundInstance,1140,1259,1);
	}
	this.frame_1259 = function() {
		var soundInstance = playSound("_15IntheVOICESTUDIOphase",0);
		this.InsertIntoSoundStreamData(soundInstance,1259,1302,1);
	}
	this.frame_1302 = function() {
		var soundInstance = playSound("_16youwillaskagoodstorytellertorerecordthestory",0);
		this.InsertIntoSoundStreamData(soundInstance,1302,1401,1);
	}
	this.frame_1401 = function() {
		var soundInstance = playSound("_17IntheFINALIZEphaseStoryProducerwillcombineyourrecordingwiththeimagesandmusicprovidedbytheapptocreateyourvideo",0);
		this.InsertIntoSoundStreamData(soundInstance,1401,1609,1);
	}
	this.frame_1609 = function() {
		var soundInstance = playSound("_18WhenthevideoiscompleteyoucanusetheSHAREphasetosharethevideowithyourfriends",0);
		this.InsertIntoSoundStreamData(soundInstance,1609,1749,1);
	}
	this.frame_1749 = function() {
		var soundInstance = playSound("_19ThefirsttimeyouopenStoryProduceryouwillnoticeabluetutorialwindow",0);
		this.InsertIntoSoundStreamData(soundInstance,1749,1889,1);
	}
	this.frame_1889 = function() {
		var soundInstance = playSound("_20Eachtimeanewtutorialwindowappearsreaditanddowhatitsays",0);
		this.InsertIntoSoundStreamData(soundInstance,1889,2006,1);
	}
	this.frame_2006 = function() {
		var soundInstance = playSound("_21TheappwillguideyouthroughtheprocesstotranslateandcreateyourfirstBibleStoryVideo",0);
		this.InsertIntoSoundStreamData(soundInstance,2006,2160,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(8).call(this.frame_8).wait(46).call(this.frame_54).wait(76).call(this.frame_130).wait(38).call(this.frame_168).wait(77).call(this.frame_245).wait(83).call(this.frame_328).wait(54).call(this.frame_382).wait(171).call(this.frame_553).wait(130).call(this.frame_683).wait(56).call(this.frame_739).wait(154).call(this.frame_893).wait(47).call(this.frame_940).wait(150).call(this.frame_1090).wait(50).call(this.frame_1140).wait(119).call(this.frame_1259).wait(43).call(this.frame_1302).wait(99).call(this.frame_1401).wait(208).call(this.frame_1609).wait(140).call(this.frame_1749).wait(140).call(this.frame_1889).wait(117).call(this.frame_2006).wait(154));

	// Top__Bottom_Banner__Introduction_
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAtA9IhNhgIAABJQAAALACADQADADAHAAIAEAAIAAAEIgpAAIAAgEIAEAAQAHAAAEgEQACgDAAgKIAAhSIgIgIIgIgDIgIgBIAAgEIAhAAIBIBYIAAhDQgBgLgCgDQgDgDgIAAIgEAAIAAgEIAqAAIAAAEIgFAAQgHgBgDAFQgCADAAAKIAABkg");
	this.shape.setTransform(212.75,10.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgpAtQgQgSAAgbQAAgcATgSQARgPAWAAQAXAAARASQARARAAAaQAAAbgRASQgRARgYAAQgYAAgRgRgAgZgrQgMAPAAAcQAAAdAMAPQAKAMAPAAQAQAAALgNQALgNAAgcQAAgegMgPQgKgMgQAAQgQAAgJAMg");
	this.shape_1.setTransform(196.975,10.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgYA8IAAgEIADAAQAIAAADgEQACgDABgLIAAhLQAAgJgCgEIgDgDQgEgCgFAAIgDAAIAAgEIAxAAIAAAEIgEAAQgHgBgDAFQgCADgBALIAABLQAAAJACAEIADADQAEACAEAAIAEAAIAAAEg");
	this.shape_2.setTransform(184.5,10.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgZA8IAAgEIAFAAQAHAAADgEQACgDAAgKIAAhaIgOAAIgMABQgEACgEAEQgDAFgBAIIgDAAIACgcIBgAAIABAcIgEAAIgCgLQgDgEgEgDQgFgCgHAAIgRAAIAABaQAAALACADQAEADAHAAIAEAAIAAAEg");
	this.shape_3.setTransform(173.05,10.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgpApQgMgRAAgWQAAgRAIgPQAIgPAOgIQAOgIAQAAQANAAAMAGIAGACQAAAAABAAQABAAAAAAQABgBAAAAQAAAAABgBQACgCABgEIADAAIADAoIgDAAQgFgSgKgIQgLgIgOAAQgLAAgJAGQgKAGgFANQgGAOAAASQAAAQAFAMQAGAMAKAGQAKAHANAAQALAAAJgFQAJgFALgPIADACQgJAQgMAHQgMAHgRAAQgcAAgRgVg");
	this.shape_4.setTransform(158.525,10.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgcA2QgKgGgFgMQgCgIAAgWIAAgtQAAgLgDgDQgEgEgGAAIgEAAIAAgDIAzAAIAAADIgEAAQgIAAgDAFQgCADAAAKIAAAzIABAQQABAJADAEQAEAGAGADQAGAEAIAAQANAAAIgGQAKgFADgIQADgIAAgTIAAgvQABgLgDgDQgDgEgHAAIgFAAIAAgDIArAAIAAADIgFAAQgHAAgEAGQgCADAAAJIAAAwQAAASgDAKQgEAKgKAHQgLAHgRAAQgTAAgKgHg");
	this.shape_5.setTransform(142.95,10.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("Ag7A8IAAgEIAEAAQAIAAADgEQACgEAAgKIAAhLQAAgMgCgDQgDgDgIAAIgEAAIAAgEIAwAAQAbABAOAGQANAFAIAOQAJAPAAASQAAAYgPARQgRASghABgAgZgyIAABlQAMACAHABQATAAANgPQAOgOAAgZQAAgXgOgPQgNgOgUAAQgIAAgKACg");
	this.shape_6.setTransform(126.8,10.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgpAtQgQgSAAgbQAAgcATgSQARgPAWAAQAXAAARASQARARAAAaQAAAbgRASQgRARgYAAQgYAAgRgRgAgZgrQgMAPAAAcQAAAdAMAPQAKAMAPAAQAQAAALgNQALgNAAgcQAAgegMgPQgKgMgQAAQgQAAgJAMg");
	this.shape_7.setTransform(110.975,10.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAcA8Igog4IgHAAIgDAAIgCAAIAAAiQAAAMACADQAEADAGAAIAFAAIAAAEIgzAAIAAgEIAEAAQAIAAADgEQACgEAAgKIAAhLQAAgMgCgDQgEgDgHAAIgEAAIAAgEIArAAQASAAAJADQAJADAHAIQAGAGAAALQAAALgHAIQgIAIgPACIAZAjQAJALAGAFQAGADAJABIAAAEgAgYgzIAAAyIADABIACAAQARAAAHgIQAJgHAAgMQAAgLgHgHQgHgHgKAAIgOABg");
	this.shape_8.setTransform(95.725,10.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgZA8IAAgEIAFAAQAHAAADgEQACgDAAgKIAAhaIgOAAIgMABQgFACgDAEQgDAFAAAIIgEAAIACgcIBfAAIACAcIgEAAIgCgLQgDgEgEgDQgFgCgHAAIgRAAIAABaQAAALACADQAEADAGAAIAFAAIAAAEg");
	this.shape_9.setTransform(81.05,10.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAtA9IhOhgIAABJQAAALADADQADADAHAAIAEAAIAAAEIgpAAIAAgEIAEAAQAHAAADgEQACgDAAgKIAAhSIgHgIIgIgDIgIgBIAAgEIAgAAIBJBYIAAhDQAAgLgDgDQgDgDgIAAIgDAAIAAgEIApAAIAAAEIgEAAQgIgBgDAFQgCADAAAKIAABkg");
	this.shape_10.setTransform(65.75,10.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgZA8IAAgEIAFAAQAHAAAEgEQABgDAAgLIAAhLIAAgNIgEgDQgEgCgEAAIgFAAIAAgEIAzAAIAAAEIgFAAQgHgBgEAFQgBADAAALIAABLIABANIADADQAEACAEAAIAFAAIAAAEg");
	this.shape_11.setTransform(53.5,10.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("ABGBeIh5iUIAABxQAAARADAEQAFAGALAAIAHAAIAAAFIhBAAIAAgFIAHAAQAMAAAFgHQADgEAAgQIAAiAIgNgMQgEgDgIgDQgEgBgIAAIAAgFIAyAAIBxCKIAAhqQAAgRgEgEQgFgGgLAAIgHAAIAAgFIBBAAIAAAFIgHAAQgLAAgFAHQgDAEAAAQIAACbg");
	this.shape_12.setTransform(246.675,580.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AhABGQgagbAAgrQAAgsAegcQAagYAkAAQAkAAAaAcQAbAbAAApQAAApgbAcQgbAcglAAQgmAAgagbgAgohDQgTAXAAAsQAAAsAUAZQAPASAYAAQAZAAARgUQARgUAAgsQAAgvgSgXQgPgTgaAAQgZAAgPATg");
	this.shape_13.setTransform(223.825,580.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgnBdIAAgFIAHAAQALAAAFgHQAEgEAAgRIAAh3QAAgOgCgEQgBgEgFgCQgGgEgGAAIgHAAIAAgFIBPAAIAAAFIgHAAQgLAAgGAHQgDAEAAARIAAB3QAAAOACAFQABADAFACQAFAEAHAAIAHAAIAAAFg");
	this.shape_14.setTransform(206.125,580.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgnBdIAAgFIAHAAQALAAAFgHQADgFAAgPIAAiNIgWAAQgNAAgFACQgIACgFAIQgFAHgBANIgFAAIACgsICXAAIACAsIgFAAQgCgMgCgFQgFgHgHgEQgHgEgLAAIgaAAIAACNQAAARADAEQAFAGALAAIAHAAIAAAFg");
	this.shape_15.setTransform(190.025,580.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("Ag/A/QgUgaABgiQAAgbAMgXQAMgXAXgNQAVgNAZAAQAUAAATAKQAHADACAAQADAAADgDQAEgDACgHIAEAAIAFA/IgFAAQgJgcgPgNQgQgMgWAAQgSAAgOAJQgPAKgJAUQgIAVAAAdQAAAZAIATQAIASAQAKQARAKATAAQASAAAOgIQAOgHARgXIADACQgOAZgSAMQgSALgaAAQgtAAgZgig");
	this.shape_16.setTransform(169.05,580.275);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgsBVQgQgLgGgSQgFgMAAghIAAhIQAAgRgEgGQgFgFgLAAIgHAAIAAgFIBQAAIAAAFIgHAAQgLAAgFAHQgEAGAAAPIAABQQAAAKACAOQACAPAGAHQAFAIAKAFQAJAFAOAAQASAAAOgIQAOgHAGgNQAFgMAAgeIAAhKQAAgRgEgFQgFgGgLAAIgHAAIAAgFIBCAAIAAAFIgHAAQgLAAgGAKQgDADAAAQIAABKQAAAcgFAQQgGAPgQALQgQALgcAAQgdAAgQgKg");
	this.shape_17.setTransform(146.525,580.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AhcBdIAAgFIAHAAQALAAAFgIQADgEAAgQIAAh3QAAgRgEgFQgFgGgKAAIgHAAIAAgFIBLAAQApAAAVAKQAWAJANAWQANAWAAAdQAAAmgXAaQgbAdg1AAgAgohNIAACcQASAEAMAAQAeAAAVgWQAVgWAAgnQAAglgVgWQgVgWggAAQgMAAgQAEg");
	this.shape_18.setTransform(123.125,580.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AhABGQgagbAAgrQAAgsAegcQAagYAkAAQAkAAAaAcQAbAbAAApQAAApgbAcQgbAcglAAQgmAAgagbgAgohDQgTAXAAAsQAAAsAUAZQAPASAYAAQAZAAARgUQARgUAAgsQAAgvgSgXQgPgTgaAAQgZAAgPATg");
	this.shape_19.setTransform(100.175,580.275);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAqBdIg9hXIgLAAIgEAAIgEAAIAAA2QAAARADAFQAGAGAKAAIAHAAIAAAFIhPAAIAAgFIAHAAQALAAAGgIQACgEAAgQIAAh3QAAgRgDgFQgGgGgKAAIgHAAIAAgFIBEAAQAcAAAOAFQAOAEAJAMQALALgBAQQABARgLANQgMAMgXAFIAmA1QANASAKAGQAJAGAPACIAAAFgAgmhPIAABNIAEABIADAAQAaAAANgMQAOgLAAgSQAAgSgLgKQgLgLgRAAQgIAAgNACg");
	this.shape_20.setTransform(78.1,580.275);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgnBdIAAgFIAHAAQALAAAFgHQADgFAAgPIAAiNIgWAAQgNAAgFACQgIACgFAIQgFAHgBANIgFAAIACgsICXAAIACAsIgFAAQgCgMgCgFQgFgHgHgEQgHgEgLAAIgaAAIAACNQAAARADAEQAFAGALAAIAHAAIAAAFg");
	this.shape_21.setTransform(56.975,580.275);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("ABGBeIh5iUIAABxQAAARADAEQAFAGALAAIAHAAIAAAFIhBAAIAAgFIAHAAQAMAAAFgHQADgEAAgQIAAiAIgNgMQgEgDgIgDQgEgBgIAAIAAgFIAyAAIBxCKIAAhqQAAgRgEgEQgFgGgLAAIgHAAIAAgFIBBAAIAAAFIgHAAQgLAAgFAHQgDAEAAAQIAACbg");
	this.shape_22.setTransform(34.875,580.425);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgnBdIAAgFIAHAAQALAAAFgHQAEgEAAgRIAAh3QAAgOgCgEQgBgEgFgCQgGgEgGAAIgHAAIAAgFIBPAAIAAAFIgHAAQgLAAgGAHQgDAEAAARIAAB3QAAAOACAFQABADAFACQAFAEAHAAIAHAAIAAAFg");
	this.shape_23.setTransform(17.525,580.275);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#666666").s().p("EgVCAu4IAAlvMAqIAAAIAAFvgEgVFgrbIAAjcMAqLAAAIAADcg");
	this.shape_24.setTransform(134.975,300);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(2160));

	// Gray_Masks
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(1,1,1).p("EgVNgvQMAqbAAAIAAbWMgqbAAAgEgU9AvRMAAAgkQ");
	this.shape_25.setTransform(134.2,302.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#666666").s().p("EgU9AvRMAAAgkQMAqLAAAMAAAAkQgA1Nz6IAA7WMAqbAAAIAAbWg");
	this.shape_26.setTransform(134.225,302.475);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#000000").ss(1,1,1).p("A1Nz6IAA7WMAqbAAAIAAbWEgU9AvRMAAAgkQ");
	this.shape_27.setTransform(134.2,302.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_26},{t:this.shape_25}]},168).to({state:[{t:this.shape_26},{t:this.shape_25}]},209).to({state:[{t:this.shape_27}]},5).to({state:[]},170).to({state:[]},68).wait(1540));

	// Overlay_images
	this.instance = new lib.Elijah1("synched",0);
	this.instance.setTransform(135,274);
	this.instance._off = true;

	this.instance_1 = new lib.Symbol1("synched",0);
	this.instance_1.setTransform(137.6,297.1,0.792,0.792);
	this.instance_1._off = true;

	this.instance_2 = new lib.JesuswLeper("synched",0);
	this.instance_2.setTransform(119.25,323,1.4173,1.4173);
	this.instance_2._off = true;

	this.instance_3 = new lib.PhaseDropdownFullsize();
	this.instance_3.setTransform(19,46,0.4878,0.4878);

	this.instance_4 = new lib.Leonardo_Phoenix_A_young_African_man_likely_in_his_early_twent_0();
	this.instance_4.setTransform(14,139,0.2375,0.2375);

	this.instance_5 = new lib.Default_A_young_African_man_likely_in_his_early_twenties_with_0();
	this.instance_5.setTransform(12,144,0.1928,0.1928);

	this.instance_6 = new lib.Africanmantalkingtopastor();
	this.instance_6.setTransform(11,149,0.2414,0.2414);

	this.instance_7 = new lib.Leonardo_Phoenix_An_African_story_teller_is_telling_a_story_to_1();
	this.instance_7.setTransform(10,164,0.2453,0.2453);

	this.instance_8 = new lib.AudioWave1();
	this.instance_8.setTransform(4,139,0.3047,0.3047);

	this.instance_9 = new lib.StoryPagesTogetherLtoR();
	this.instance_9.setTransform(5,268,0.4204,0.4204);

	this.instance_10 = new lib.grades2570451_640();
	this.instance_10.setTransform(33,352,0.3328,0.3328);

	this.instance_11 = new lib.Leonardo_Phoenix_A_closely_framed_portrait_of_two_individuals_3();
	this.instance_11.setTransform(6,187,0.2511,0.2511);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},168).to({state:[{t:this.instance}]},71).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},83).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},57).to({state:[{t:this.instance_3}]},1).to({state:[]},171).to({state:[{t:this.instance_4}]},66).to({state:[]},64).to({state:[{t:this.instance_4}]},56).to({state:[]},154).to({state:[{t:this.instance_5}]},47).to({state:[]},149).to({state:[{t:this.instance_6}]},51).to({state:[]},119).to({state:[{t:this.instance_7}]},43).to({state:[]},99).to({state:[{t:this.instance_8}]},81).to({state:[{t:this.instance_8},{t:this.instance_9}]},21).to({state:[{t:this.instance_8},{t:this.instance_9},{t:this.instance_10}]},13).to({state:[]},93).to({state:[{t:this.instance_11}]},52).to({state:[]},88).to({state:[]},1).wait(410));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(168).to({_off:false},0).to({scaleX:1.4822,scaleY:1.4822,x:122.85,y:320.75},71).to({_off:true},1).wait(1920));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(240).to({_off:false},0).to({scaleX:1,scaleY:1,x:168.65,y:291.1},83).to({_off:true,scaleX:1.4173,scaleY:1.4173,x:119.25,y:323},1).wait(1836));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(323).to({_off:false},1).to({regX:0.1,scaleX:1.0096,scaleY:1.0096,x:133.5,y:284},57).to({_off:true},1).wait(1778));

	// Screen_Shots
	this.instance_12 = new lib.Screenshot_20240926_133120_StoryProducer();

	this.instance_13 = new lib.Screenshot_20240926_133251_StoryProducer();

	this.instance_14 = new lib.Screenshot_20240809_165933_StoryProducer();

	this.instance_15 = new lib.Screenshot_20240903_150023_StoryProducer();

	this.instance_16 = new lib.Screenshot_20240930_171007_StoryProducer();

	this.instance_17 = new lib.Screenshot_20240930_171056_StoryProducer();

	this.instance_18 = new lib.Screenshot_20240930_171115_StoryProducer();

	this.instance_19 = new lib.Finalize("synched",0);
	this.instance_19.setTransform(135,300);

	this.instance_20 = new lib.Screenshot_20240918_141851_StoryProducer();

	this.instance_21 = new lib.Screenshot_20240918_142121_StoryProducer();

	this.instance_22 = new lib.Screenshot_20240916_163055_StoryProducer();

	this.instance_23 = new lib.Screenshot_20241010_150419_StoryProducer();

	this.instance_24 = new lib.Screenshot_20241010_150441_StoryProducer();

	this.instance_25 = new lib.Screenshot_20241010_150458_StoryProducer();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_12}]},54).to({state:[{t:this.instance_12},{t:this.instance_13}]},76).to({state:[]},38).to({state:[{t:this.instance_14}]},385).to({state:[{t:this.instance_15}]},130).to({state:[{t:this.instance_16}]},210).to({state:[{t:this.instance_17}]},197).to({state:[{t:this.instance_18}]},169).to({state:[{t:this.instance_20},{t:this.instance_19,p:{alpha:1}}]},142).to({state:[{t:this.instance_19,p:{alpha:0.3086}}]},79).to({state:[{t:this.instance_21}]},129).to({state:[{t:this.instance_22}]},140).to({state:[{t:this.instance_23}]},140).to({state:[{t:this.instance_24}]},117).to({state:[{t:this.instance_25}]},56).wait(98));

	// Gray_background
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(1,1,1).p("EgVRgu/MAqjAAAMAAABd/MgqjAAAg");
	this.shape_28.setTransform(135.15,298.875);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#666666").s().p("EgVQAvAMAAAhd/MAqhAAAMAAABd/g");
	this.shape_29.setTransform(135.15,298.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_29},{t:this.shape_28}]},382).to({state:[]},171).wait(1607));

	// Logo_Screen
	this.instance_26 = new lib.StoryProducerWordsonly_Wordsonly_Small();
	this.instance_26.setTransform(7,376,0.502,0.502);

	this.instance_27 = new lib.StoryProducerLogonotextMarch2024_Currentfavorite02();
	this.instance_27.setTransform(2,67,0.2405,0.2405);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_27},{t:this.instance_26}]}).to({state:[{t:this.instance_27},{t:this.instance_26}]},54).to({state:[]},1).wait(2105));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(57.8,297.1,327.5,308.9);
// library properties:
lib.properties = {
	id: '84D974CAF933EC42B707E9E41A48798A',
	width: 270,
	height: 600,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Introduction_atlas_P_1.png", id:"Introduction_atlas_P_1"},
		{src:"images/Introduction_atlas_NP_1.jpg", id:"Introduction_atlas_NP_1"},
		{src:"sounds/_1WelcometoStoryProducer.mp3", id:"_1WelcometoStoryProducer"},
		{src:"sounds/_10youwilllistentothestoryinonelanguageandrecordanaudiotranslationinyourlanguage.mp3", id:"_10youwilllistentothestoryinonelanguageandrecordanaudiotranslationinyourlanguage"},
		{src:"sounds/_11IntheCOMMUNITYWORKphase.mp3", id:"_11IntheCOMMUNITYWORKphase"},
		{src:"sounds/_12otherswhospeakyourlanguagewilllistentoyourtranslationandgiveyoufeedbackonhowtoimproveit.mp3", id:"_12otherswhospeakyourlanguagewilllistentoyourtranslationandgiveyoufeedbackonhowtoimproveit"},
		{src:"sounds/_13IntheACCURACYCHECKphase.mp3", id:"_13IntheACCURACYCHECKphase"},
		{src:"sounds/_14youwillaskaBibleteachertomakesureyourtranslationtellsthestoryaccurately.mp3", id:"_14youwillaskaBibleteachertomakesureyourtranslationtellsthestoryaccurately"},
		{src:"sounds/_15IntheVOICESTUDIOphase.mp3", id:"_15IntheVOICESTUDIOphase"},
		{src:"sounds/_16youwillaskagoodstorytellertorerecordthestory.mp3", id:"_16youwillaskagoodstorytellertorerecordthestory"},
		{src:"sounds/_17IntheFINALIZEphaseStoryProducerwillcombineyourrecordingwiththeimagesandmusicprovidedbytheapptocreateyourvideo.mp3", id:"_17IntheFINALIZEphaseStoryProducerwillcombineyourrecordingwiththeimagesandmusicprovidedbytheapptocreateyourvideo"},
		{src:"sounds/_18WhenthevideoiscompleteyoucanusetheSHAREphasetosharethevideowithyourfriends.mp3", id:"_18WhenthevideoiscompleteyoucanusetheSHAREphasetosharethevideowithyourfriends"},
		{src:"sounds/_19ThefirsttimeyouopenStoryProduceryouwillnoticeabluetutorialwindow.mp3", id:"_19ThefirsttimeyouopenStoryProduceryouwillnoticeabluetutorialwindow"},
		{src:"sounds/_2ThisappwillhelpyoutranslateBiblestories.mp3", id:"_2ThisappwillhelpyoutranslateBiblestories"},
		{src:"sounds/_20Eachtimeanewtutorialwindowappearsreaditanddowhatitsays.mp3", id:"_20Eachtimeanewtutorialwindowappearsreaditanddowhatitsays"},
		{src:"sounds/_21TheappwillguideyouthroughtheprocesstotranslateandcreateyourfirstBibleStoryVideo.mp3", id:"_21TheappwillguideyouthroughtheprocesstotranslateandcreateyourfirstBibleStoryVideo"},
		{src:"sounds/_3orBloomBooks.mp3", id:"_3orBloomBooks"},
		{src:"sounds/_4andcreatesimplevideosinyourlanguage.mp3", id:"_4andcreatesimplevideosinyourlanguage"},
		{src:"sounds/_7StoryProducerwillhelpyoucreatevideoslikethisbyguidingyouthrough7stepswecallPhases.mp3", id:"_7StoryProducerwillhelpyoucreatevideoslikethisbyguidingyouthrough7stepswecallPhases"},
		{src:"sounds/_8TheLEARNphasewillhelpyoulearnthestorywellsoyoucancreateagoodtranslation.mp3", id:"_8TheLEARNphasewillhelpyoulearnthestorywellsoyoucancreateagoodtranslation"},
		{src:"sounds/_9IntheTRANSLATEREVISEphase.mp3", id:"_9IntheTRANSLATEREVISEphase"},
		{src:"sounds/ElijahandWidowtalkingtoKingwav.mp3", id:"ElijahandWidowtalkingtoKingwav"},
		{src:"sounds/KarenJesusHealsLeperwav.mp3", id:"KarenJesusHealsLeperwav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['84D974CAF933EC42B707E9E41A48798A'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;