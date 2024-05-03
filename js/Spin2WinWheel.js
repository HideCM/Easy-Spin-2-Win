function Spin2WinWheel() {

  gsap.registerPlugin(InertiaPlugin, TextPlugin, Draggable);

  var xmlns = "http://www.w3.org/2000/svg",
    xlinkns = "http://www.w3.org/1999/xlink",
    select = function(s) {
      return document.querySelector(s);
    },
    selectAll = function(s) {
      return document.querySelectorAll(s);
    },
    thisWheel = this,
    wheelSVG = select('.wheelSVG'),
    wheel = select('.wheel'),
    wheelOutline = select('.wheelOutline'),
    wheelContainer = select('.wheelContainer'),
    peg = select('.peg'),
    pegContainer = select('.pegContainer'),
    mainContainer = select('.mainContainer'),
    valueContainer = select('.valueContainer'),
    centerCircle = select('.centerCircle'),
    toast = select('.toast'),
    toastText = select('.toast p'),
    centerCircleImageContainer = select('.centerCircleImageContainer'),
    dataObj,
    svgWidth,
    svgHeight,
    wheelStrokeColor,
    wheelStrokeWidth,
    wheelFillColor = 'transparent',
    wheelSize,
    wheelRadius,
    wheelTextColor,
    wheelTextOffsetY,
    wheelImageOffsetY,
    wheelTextSize,
    wheelImageSize,
    wheelDragger,
    currentWheelRotation,
    centerCircleStrokeColor,
    centerCircleStrokeWidth,
    centerCircleFillColor,
    centerCircleSize,
    centerCircleImageUrl,
    centerCircleImageWidth,
    centerCircleImageHeight,    
    centerCircleRadius,
    segmentStrokeColor,
    segmentStrokeWidth,
    segmentValuesArray,
    numSegments,
    numSpins,
    rotationStep,
    segmentStep,
    oldWheelPos,
    currentWheelPos = 0,
    centerX,
    centerY,
    colorArray,
    spinCount = 0,
    spinMultiplier = 2,
    colorCount = 0,
    startAngle = 0,
    endAngle = startAngle,
    segmentArray = [],
    minSpinDuration,
    maxSpinDuration,
    gameOverText,
    invalidSpinText,
    introText,
    gameId,
    hasSound,
    hasShadows,
    clickToSpin,
    spinButton = null,
    onResult,
    onGameEnd,
    onError,
    spinInertiaPlugin,
    gameResultsArray = [],
    pegSnd = new Audio('media/wheel_tick.mp3'),
    spinDestinationArray,
    randomSpins = true,
    spinDirection,// = -1,
    numRevsPerDestination,
    invalidSpinThreshold,
    probabilityArray = null,
    hasProbability = false,
    requiredProb,
    restrictPlayDuration,
    initError1 = "Invalid destination set - please ensure the destination in spinDestinationArray is greater than 0 and less than or equal to the number of segments",
    initError2 = "Not enough segments. Please add more entries to segmentValuesArray",
    probabilityErrorStr = "If you have set JSON probability values they must add up to 100",
    disabledText,
    isDisabled = false,
    wheelProp = gsap.getProperty('.wheel'),
    initSpinVelocity = null,
    showErrorDelay = 0.1,
    setInitData = function() {

      wheelStrokeColor = dataObj.wheelStrokeColor;
      wheelSize = dataObj.wheelSize;
      wheelRadius = wheelSize / 2;
      wheelTextColor = dataObj.wheelTextColor;
      wheelStrokeColor = dataObj.wheelStrokeColor;
      wheelStrokeWidth = dataObj.wheelStrokeWidth;
      wheelTextOffsetY = dataObj.wheelTextOffsetY;
      wheelImageOffsetY = dataObj.wheelImageOffsetY;
      wheelImageSize = dataObj.wheelImageSize;
      wheelTextSize = dataObj.wheelTextSize;
      centerCircleStrokeColor = dataObj.centerCircleStrokeColor;
      centerCircleStrokeWidth = dataObj.centerCircleStrokeWidth;
      centerCircleFillColor = dataObj.centerCircleFillColor;
      centerCircleSize = dataObj.centerCircleSize;
      centerCircleRadius = centerCircleSize / 2;
      centerCircleImageUrl = dataObj.centerCircleImageUrl;
      centerCircleImageWidth = dataObj.centerCircleImageWidth;
      centerCircleImageHeight = dataObj.centerCircleImageHeight;        
      segmentStrokeColor = dataObj.segmentStrokeColor;
      segmentStrokeWidth = dataObj.segmentStrokeWidth;
      segmentValuesArray = dataObj.segmentValuesArray;
      numSegments = segmentValuesArray.length;
      numSpins = (dataObj.numSpins == -1) ? 9999999999999999 : parseInt(dataObj.numSpins);
      minSpinDuration = dataObj.minSpinDuration;
      maxSpinDuration = (dataObj.maxSpinDuration <= dataObj.minSpinDuration) ? dataObj.minSpinDuration : dataObj.maxSpinDuration;
      gameOverText = dataObj.gameOverText;
      invalidSpinText = dataObj.invalidSpinText;
      introText = dataObj.introText;
      hasSound = dataObj.hasSound;
      gameId = dataObj.gameId;
      rotationStep = 360 / numSegments;
      segmentStep = rotationStep / 2;
      centerX = dataObj.centerX;
      centerY = dataObj.centerY;
      colorArray = dataObj.colorArray;
      hasShadows = dataObj.hasShadows;
      spinDestinationArray = dataObj.spinDestinationArray;
      spinDirection = (dataObj.spinDirection === 'cw') ? -1 : 1;
      clickToSpin = dataObj.clickToSpin;
      disabledText = dataObj.disabledText;
      //spinDirection = (clickToSpin) ? 1 : spinDirection;
      numRevsPerDestination = spinDirection * (3 * 360);
      //invalidSpinThreshold =  0.5;
      invalidSpinThreshold =  500;
      restrictPlayDuration = dataObj.restrictPlayDuration;
      if (hasShadows) {
        wheelOutline.setAttributeNS(null, 'filter', 'url(#shadow)');
        valueContainer.setAttributeNS(null, 'filter', 'url(#shadow)');
        centerCircle.setAttributeNS(null, 'filter', 'url(#shadow)');
        pegContainer.setAttributeNS(null, 'filter', 'url(#shadow)');
        toast.style.boxShadow = "0px 0px 20px rgba(21,21,21,0.5)";
      }
    },
    setInitPos = function() {

      gsap.set('svg', {
        visibility: 'visible'
      })
      gsap.set(wheel, {
        svgOrigin: centerX + ' ' + centerY,
        x: 0,
        y: 0
      })
      gsap.set(peg, {
        x: centerX - (peg.getBBox().width / 2),
        y: centerY - wheelRadius - (peg.getBBox().height / 2),
        transformOrigin: '50% 25%',
        visibility: 'visible'
      })
      gsap.set(pegContainer, {
        transformOrigin: '50% 100%',
        scale: wheelSize / 600
      })

      gsap.set(mainContainer, {
        svgOrigin: centerX + ' ' + centerY,
        rotation: -90,
        x: 0,
        y: 0
      })


    },
    setCenterCircleImage = function(){

      //centerCircleImageContainer
      var centerCircleImage = document.createElementNS(xmlns, "image");
      centerCircleImage.setAttributeNS(xlinkns, "xlink:href", centerCircleImageUrl);
      centerCircleImage.setAttribute("width", centerCircleImageWidth);
      centerCircleImage.setAttribute("height", centerCircleImageHeight);
      centerCircleImage.setAttribute("x", centerX - (centerCircleImageWidth/2));
      centerCircleImage.setAttribute("y", centerY - (centerCircleImageHeight/2));
      centerCircleImageContainer.appendChild(centerCircleImage);
      
    },    
    setSpinDestinations = function() {

      //console.log(dataObj.numSpins)
      if(numSpins == 0){

        showToast(disabledText);
        isDisabled = true;
        spinButton.onclick = null;

        return;
      }

      if(hasProbability){

        return;
      }


      if (spinDestinationArray.length > 0) {

        randomSpins = false;
        numSpins = spinDestinationArray.length;
        for (var i = 0; i < spinDestinationArray.length; i++) {
          //check to see if the destination is available (if you set the destination to be more than the number of segments this will catch that)
          if (spinDestinationArray[i] > numSegments || spinDestinationArray[i] === 0) {
            showInitError(initError1);

            
            return;
          }
          //make it zero based - this allows the author to set destinations using 1 as the first one (UX FTW!)
          spinDestinationArray[i] = spinDestinationArray[i] - 1;
          //ensure there is at least 2 spin revolutions (360 2 = 720) between destination spins
          spinDestinationArray[i] = ((spinDestinationArray[i] * -1) * rotationStep) - (numRevsPerDestination * spinMultiplier);
          //this multiplier increments to ensure the destination segment is indeed further around
          spinMultiplier += 2;
        }

      } else {

        //no else
      }

      //console.log(spinDestinationArray)

      if(clickToSpin){
        createClickToSpin();
      } else{
        createDraggable();
      }
      
      showIntroText();
    },
    randomBetween = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    drawSegments = function() {
      var x1, x2, y1, y2, d, p, g, t, tn, destFill;
      for (var i = 0; i < numSegments; i++) {
        //startAngle = endAngle;
        startAngle = -segmentStep;
        endAngle = startAngle + rotationStep;

        x1 = (centerX + wheelRadius * Math.cos(Math.PI * startAngle / 180));
        y1 = (centerY + wheelRadius * Math.sin(Math.PI * startAngle / 180));
        x2 = (centerX + wheelRadius * Math.cos(Math.PI * endAngle / 180));
        y2 = (centerY + wheelRadius * Math.sin(Math.PI * endAngle / 180));

        d = "M" + centerX + "," + centerY + "  L" + x1 + "," + y1 + "  A" + wheelRadius + "," + wheelRadius + " 0 0,1 " + x2 + "," + y2 + "z";

        g = document.createElementNS(xmlns, 'g');
        p = document.createElementNS(xmlns, 'path');
        g.appendChild(p);
        //g.appendChild(t);
        wheel.appendChild(g);
        gsap.set(p, {
          rotation: (i * rotationStep),
          svgOrigin: centerX + ' ' + centerY
        })
        p.setAttributeNS(null, 'd', d);

        //check if there are enough colors in the array to support the numer of segments
        if (colorArray[i]) {
          destFill = colorArray[i];
        } else {
          destFill = colorArray[colorCount];
          colorCount++;
          //if the extra color cycle count gets bigger than the number of listed colors set it back to 0 and start using them from the start (repeat the colors)
          if (colorCount == colorArray.length) {
            colorCount = 0;
          }
        }

        p.setAttributeNS(null, "fill", destFill);
        p.setAttributeNS(null, "stroke", 0);
        segmentArray.push({
          path: p,
          x1: x1,
          x2: x2,
          y1: y1,
          y2: y2
        });

      } //end for

      if (segmentStrokeWidth > 0) {
        drawSegmentStrokes()
      }

      addValues()

    },
    drawSegmentStrokes = function() {

      for (var i = 0; i < numSegments; i++) {

        var l = document.createElementNS(xmlns, 'line');  
        l.setAttributeNS(null, 'x1', centerX);
        l.setAttributeNS(null, 'x2', segmentArray[i].x2);
        l.setAttributeNS(null, 'y1', centerY);
        l.setAttributeNS(null, 'y2', segmentArray[i].y2);
        l.setAttributeNS(null, 'stroke', segmentStrokeColor);
        l.setAttributeNS(null, 'stroke-width', segmentStrokeWidth);
        wheel.appendChild(l);

        gsap.set(l, {
          svgOrigin: centerX + ' ' + centerY,
          rotation: (i * rotationStep)
        })
      }

    },
    addValues = function() {

      for (var i = 0; i < numSegments; i++) {

        var g = document.createElementNS(xmlns, 'g');
        //var c = document.createElementNS(xmlns, 'circle');
        if (segmentValuesArray[i].type == "image") {

          var ig = document.createElementNS(xmlns, 'image');
          g.appendChild(ig);
          ig.setAttribute('class', 'wheelImage');
          ig.setAttributeNS(null, 'x', centerX - (wheelImageSize / 2));
          ig.setAttributeNS(null, 'y', centerY - wheelRadius + wheelImageOffsetY);
          ig.setAttributeNS(null, 'width', wheelImageSize);
          ig.setAttributeNS(null, 'height', wheelImageSize);
          ig.setAttributeNS(xlinkns, 'xlink:href', segmentValuesArray[i].value);
        } else if (segmentValuesArray[i].type == "string") {

          var t = document.createElementNS(xmlns, 'text');

          var lines = segmentValuesArray[i].value.split('^'), tn, ts;

          lines.forEach(function (value,index) {
              tn = document.createTextNode(value);
              ts = document.createElementNS(xmlns, "tspan");

              ts.setAttributeNS(null,'dy',  (index) ? "1.2em" : 0);

              ts.setAttributeNS(null,'x',centerX);

              ts.setAttributeNS(null,'text-anchor','middle');

              ts.appendChild(tn);

              t.appendChild(ts);
          });

          g.appendChild(t);
          t.setAttribute('class', 'wheelText');
          t.setAttributeNS(null, 'fill', wheelTextColor);
          t.setAttributeNS(null, 'x', centerX);
          t.setAttributeNS(null, 'y', centerY - wheelRadius + wheelTextOffsetY);
          t.style.fontSize = wheelTextSize;
        }

        valueContainer.appendChild(g)

        gsap.set(g, {
          svgOrigin: centerX + ' ' + centerY,
          rotation: i * rotationStep
        })

      }

      gsap.set(valueContainer, {
        svgOrigin: centerX + ' ' + centerY
      })

    },
    getWheel = function() {

      var g = document.createElementNS(xmlns, 'g');
      var c = document.createElementNS(xmlns, 'circle');
      wheelOutline.appendChild(g);

      //wheel's outline
      c.setAttributeNS(null, 'fill', wheelFillColor);
      c.setAttributeNS(null, 'stroke', wheelStrokeColor);
      c.setAttributeNS(null, 'stroke-width', wheelStrokeWidth);
      c.setAttributeNS(null, 'cx', centerX);
      c.setAttributeNS(null, 'cy', centerY);
      c.setAttributeNS(null, 'r', wheelRadius);
      g.appendChild(c);

      return g;
    },
    getCenterCircle = function() {

      var c = document.createElementNS(xmlns, 'circle');

      //circle's outline
      c.setAttributeNS(null, 'fill', centerCircleFillColor);
      c.setAttributeNS(null, 'stroke', centerCircleStrokeColor);
      c.setAttributeNS(null, 'stroke-width', centerCircleStrokeWidth);
      c.setAttributeNS(null, 'cx', centerX);
      c.setAttributeNS(null, 'cy', centerY);
      c.setAttributeNS(null, 'r', centerCircleRadius);

      return c;
    },
    onPegTweenStart = function() {
      pegSnd.play();
    },
    onWheelPress = function() {
      // popup.style.visibility = 'hidden';
      toast.style.visibility = 'hidden';

    },    
    onButtonPress = function() {
      
      toast.style.visibility = 'hidden';
      spinButton.onclick = null;
      spinMultiplier +=2;

    },
    onWheelDragEnd = function() {
      initSpinVelocity = Math.abs(InertiaPlugin.getVelocity(wheel,'rotation'));        
      //console.log('initSpinVelocity', initSpinVelocity);
      disableWheel();
      //prevent players dragging and dropping the wheel onto a segment
      if (randomSpins) {
        spinInertiaPlugin = InertiaPlugin.track(wheel, "rotation");        
      }
      
    },
    throwUpdate = function(e) {
      //this deals with the peg ticker (at the top) and decides which direction it should flick
      //personally I think this is a nice touch - hope you do too!
      oldWheelPos = currentWheelPos;

      currentWheelPos = Math.round(wheelProp('rotation') / rotationStep);
      //peg code only
      if (currentWheelPos != oldWheelPos) {

        var rotation = (currentWheelPos > oldWheelPos) ? -35 : 35;

        gsap.fromTo(peg, {

          rotation: rotation
        }, {
          duration: 0.2, 
          onStart: (hasSound) ? onPegTweenStart : null,
          rotation: 0,
          ease: 'back'
        })
      }
      //keep the values (images. text) sync'd with the wheel spinning
      gsap.set(valueContainer, {
        rotation: wheelProp('rotation')
      })
      
    },
    throwComplete = function() {


      //work out where the wheel lands
      currentWheelRotation = wheelProp('rotation');
      var normalizedRotation = Math.round(currentWheelRotation % 360);
      normalizedRotation = (normalizedRotation > 0) ? 360 - normalizedRotation : normalizedRotation;
      //console.log("complete", currentWheelRotation, normalizedRotation, InertiaPlugin.getVelocity(wheel, 'rotation'))

      normalizedRotation = (normalizedRotation < 0) ? normalizedRotation *= -1 : normalizedRotation;     
            
      //check to see if spinInertiaPlugin exists (only when randomSpins = true)
      //console.log(spinInertiaPlugin, Math.abs(InertiaPlugin.getVelocity(wheel,'rotation')))
      if (spinInertiaPlugin && initSpinVelocity <= invalidSpinThreshold) {

        enableWheel();        
        showResult('invalidSpin');        
        return;
        
      }

      var segId = Math.round(normalizedRotation / rotationStep);
      var winningSegment = segmentArray[segId].path;

      showResult(Math.abs(segId));

      //randomSpins is true if no destinations have been set
      if (randomSpins) {
        //this means no destinations have been set        
        if (numSpins > -1) {
          //this means no destinations have been set AND numSpins has been set to a positive number          
          spinCount++;
        } else {
          //this means no destinations have been set AND numSpins is -1 meaning you can spin randomly forever
          //so stop executing anything else
          return;
        }
      } else {
        //this means destinations have been set
        spinCount++;
        wheelDragger[0].vars.snap = [spinDestinationArray[spinCount]];
      }

      InertiaPlugin.untrack(wheel);

      if (spinCount >= numSpins) {
        endGame();
        return;
      }

      enableWheel();

    },
    updateWheelBounds = function(){
      
      if(clickToSpin)return;
      
      wheelDragger[0].applyBounds({
        minRotation: spinDirection * -9999999999999999,
        maxRotation: currentWheelRotation
      });      
    },  
    getRandomSpinFunction = function(multiplier) {
      var f = function(endValue) {
        //console.log(endValue)
        return (Math.round((endValue / rotationStep)) * rotationStep) - multiplier
      }
      return f;
    },
    getRandomClickSpin = function() {
      var val = - (rotationStep * randomBetween(0, numSegments)) - numRevsPerDestination * spinMultiplier
      return val
    },
    getProbabilityClickSpin = function(){
      var probId = Math.floor(Math.random() * probabilityArray.length);
      var probSeg = probabilityArray[probId];
      var val = - (rotationStep * probSeg) - numRevsPerDestination * spinMultiplier
      
      return val

    },
    createDraggable = function() {
      wheelDragger = Draggable.create(wheel, {
        type: 'rotation',
        bounds: {
          minRotation: spinDirection * -9999999999999999,
          maxRotation: 0
        },
        inertia: true,
        ease: 'back(0.2)',
        snap: (randomSpins) ?  getRandomSpinFunction(0) : [spinDestinationArray[spinCount]],
        throwResistance: 0,
        minDuration: minSpinDuration,
        maxDuration: minSpinDuration,        
        onThrowComplete: throwComplete,
        onPress: onWheelPress,
        onDrag: throwUpdate,
        onThrowUpdate: throwUpdate,
        //overshootTolerance: 1,
        onDragEnd: onWheelDragEnd

      })
    },

    checkHasProbability = function(){
      
      hasProbability = true;
      segmentValuesArray.forEach( function(el, val){
        //console.log(!isNaN(el.probability))
        //if(!el.probability){
        if(isNaN(el.probability)){

          hasProbability = false;
          //return false;

        } 
      })

      if(hasProbability){

        spinDestinationArray = [];//, numSpins)
        numSpins = (dataObj.numSpins == -1) ? 9999999999999999 : parseInt(dataObj.numSpins);
        checkProbabilityValues();
        
      }

    },

    checkProbabilityValues = function(){


      var totalProb = 0;//, requiredProb = 100;


      segmentValuesArray.forEach( function(el, val){
        totalProb += el.probability;
      })

      requiredProb = totalProb;


      if(Math.ceil(totalProb) == requiredProb || Math.floor(totalProb) == requiredProb){

        createProbabilityArray();

      } else {

        var r = confirm("Total probability: " + totalProb + ' - ' +probabilityErrorStr);
        if (r == true) {
        gsap.set(wheelContainer, {
          autoAlpha:0
        })
        gsap.set(wheelContainer, {
          autoAlpha:0
        })
           
        }       
       
        
      }



    }

    createProbabilityArray = function(){

      
      probabilityArray = [];

      segmentValuesArray.forEach( function(el, val){
        
        for(var i = 0; i < el.probability; i++){

          probabilityArray.push(val);
        }
      })



    },

    showProbabilityError = function (){


    },
    createClickToSpin = function(){

      if(checkHasProbability()){

        createProbabilityArray();
      }
      //check to see if the author called setSpinTrigger before init();
      //if spinTrigger is defined then they set it before
      //if it's not then we set wheel to be the button. Later the author may
      //overwrite this with their own button
      if(spinButton){
        spinButton.onclick = getTrigger();
      } else {
        spinButton = wheel;
        wheel.onclick = getTrigger();        
      } 

    
      },
    getTrigger = function(){
         return function(){

          if(hasProbability){

          gsap.to(wheel, {
            inertia:{
            	duration:{min:minSpinDuration, max:maxSpinDuration},
              rotation:{
                velocity:spinDirection * randomBetween(-700, -500), 
                //if it's random spins then get a random spin but pass in the multiplier to ensure a long spin (plus the right slot id)
                //if it has destinations set then use those
                end:getProbabilityClickSpin()
                //end:dest
              }
            },
            onStart:onButtonPress,
            onUpdate:throwUpdate,
            ease: Back.easeOut.config(0.2),
            //overshootTolerance:0,
            onComplete:spinComplete
          });  
            
          } else {

          var dest = -rotationStep * 2;
         
          gsap.to(wheel, {
            inertia:{
            	duration:{min:minSpinDuration, max:maxSpinDuration},
              rotation:{
                velocity:spinDirection * randomBetween(-700, -500), 
                //if it's random spins then get a random spin but pass in the multiplier to ensure a long spin (plus the right slot id)
                //if it has destinations set then use those
                end:(randomSpins) ? getRandomClickSpin(): [spinDestinationArray[spinCount]]
                //end:dest
              }
            },
            onStart:onButtonPress,
            onUpdate:throwUpdate,
            ease: Back.easeOut.config(0.2),
            //overshootTolerance:0,
            onComplete:spinComplete
          }); 

          }         
        }      
    },
    spinComplete = function() {

      //work out where the wheel lands
      currentWheelRotation = wheelProp('rotation');
      var normalizedRotation = Math.round(currentWheelRotation % 360);
      normalizedRotation = (normalizedRotation > 0) ? 360 - normalizedRotation : normalizedRotation;

      normalizedRotation = (normalizedRotation < 0) ? normalizedRotation *= -1 : normalizedRotation;        
      
      var segId = Math.round(normalizedRotation / rotationStep);
      var winningSegment = segmentArray[segId].path;

      showResult(Math.abs(segId));
      
      //randomSpins is true if no destinations have been set
      if (randomSpins) {
        //this means no destinations have been set        
        if (numSpins > -1) {
          //this means no destinations have been set AND numSpins has been set to a positive number          
          spinCount++;
          
        } else {
          //this means no destinations have been set AND numSpins is -1 meaning you can spin randomly forever
          //so stop executing anything else
          return;
        }
      } else {
        //this means destinations have been set
        spinCount++;

      }

      if (spinCount >= numSpins) {
        endGame();
        return;
      }
      
      spinButton.onclick = getTrigger();
    },      
    endGame = function() {

      //prevent the wheel being dragged once the game has finished
      disableWheel();

      gsap.set(wheelSVG, {
        opacity: 0.3
      })

      //show the gameOver text after 4 seconds
      gsap.to(toastText, {
        duration: 1,
        text: gameOverText,
        ease: Linear.easeNone,
        delay: 2
      })

      onGameEnd({gameId:gameId, target:thisWheel, results:gameResultsArray});

    },
    disableWheel = function() {
      if(clickToSpin)return;
      wheelDragger[0].disable();
    },
    enableWheel = function() {
      if(clickToSpin)return;
      wheelDragger[0].enable();
    },
    showResult = function(e) {
      
      updateWheelBounds();
      
      var resultObj;
      //if it's an error 
      if (e == "invalidSpin") {

        gsap.set(wheel, {
            rotation: spinDestinationArray[spinCount]
          })
        showToast(invalidSpinText);
        //create a result object 
        resultObj = {target:thisWheel, type:'error', spinCount:spinCount, win:null, msg:invalidSpinText, gameId:gameId};

        //fire the error event
        onError(resultObj);
        
        //add result to gameResultsArray
        gameResultsArray.push(resultObj);
                   
        return;
      }
      //if it's a number then it's a segment
      if (!isNaN(e)) {
        //the JSON contains a property that defines whether the segment is a winner or loser. Useful for backend decisions.
        //var resultStr1 = (segmentValuesArray[e].win) ? 'WIN:' : 'LOSE:';
        var resultStr2 = segmentValuesArray[e].resultText;

        showToast(resultStr2);
        //create a result object 
        resultObj = {target:thisWheel, type:'result', spinCount:spinCount, win:segmentValuesArray[e].win, msg:segmentValuesArray[e].resultText, gameId:gameId, userData:segmentValuesArray[e].userData};
        
        //fire the result event
        onResult(resultObj);
        
        //add result to gameResultsArray
        gameResultsArray.push(resultObj);
      }
    },
    showIntroText = function(str) {
      if(!dataObj.introTextVisible) return;
      showToast(introText);
    },
  showInitError = function(str) {
      gsap.set([wheelContainer, spinButton], {
        autoAlpha: 0
      }) 
      gsap.delayedCall(showErrorDelay, function(){
        alert(str)
      });     
    },
    showToast = function(str) {
      toast.style.visibility = 'visible';      
      toastText.innerHTML = str;
      gsap.fromTo(toast, {
        y: 20,
        opacity: 0
      }, {
        duration: 0.6,
        y: 0,
        opacity: 1,
        delay: 0.2,
        //onStart:onresize,
        ease: 'elastic(0.7, 0.7)'
      })
      
    },
    checkNumSegments = function() {

      if (numSegments <= 1) {
        showInitError(initError2)
        gsap.set(wheelSVG, {
          visibility: 'hidden'
        })
        
      }
      

    },
    setSpinTrigger = function(){  
      
      if(spinButton){
        clickToSpin = true;
      }
      if(clickToSpin){
        
        if(spinButton){
          spinButton.onclick = getTrigger(); 
        } else {
          
          wheel.onclick = getTrigger(); 
        }               
      } else {
        
      }
  },
  checkRestriction = function(){
    
      //if (restrictPlayDuration > 0) {
        onRestrict(restrictPlayDuration);
        
      //}    
  },  
    onResult = function(e){
        thisWheel.onResult(e)
      },
   onError = function(e){
        thisWheel.onError(e)
      },
   onGameEnd = function(e){
        thisWheel.onGameEnd(e)
      },
    onRestrict = function(e){
        thisWheel.onRestrict(e)
      } 
 
  this.onResult = onResult;
  this.onError = onError;
  this.onGameEnd = onGameEnd;

  this.onRestrict = onRestrict;  
 
 
  this.getGameProgress = function(){  return gameResultsArray; };
  this.init = function(e) {
  //if(String.fromCharCode(57,66,51).toLowerCase() !=  _s){_uu();}       
  //console.log(e)
    if(!e){
      setInitPos();
      showInitError('PLEASE INCLUDE THE INIT OBJECT');
      return;
    }
    svgWidth = e.data.svgWidth;
    svgHeight =  e.data.svgHeight;
    wheelSVG.setAttribute('viewBox', '0 0 ' + svgWidth + ' ' + e.data.svgHeight);
    dataObj = e.data;
    onGameEnd = (e.onGameEnd) ? e.onGameEnd : function(){};
    onResult =  (e.onResult) ? e.onResult : function(){};
    onError = (e.onError) ? e.onError : function(){};
    onRestrict = (e.onRestrict) ? e.onRestrict : function(){};
    spinButton = (e.spinTrigger) ? e.spinTrigger : null;
    setSpinTrigger();
    setInitData();

    onRestrict(restrictPlayDuration);
    
    setInitPos();
    drawSegments();
    setCenterCircleImage();
    wheelOutline.appendChild(getWheel())
    centerCircle.appendChild(getCenterCircle());
    setSpinDestinations();
    checkNumSegments();
    //checkRestriction();

    

    
    
    
  } 

  this.restart = function() {
    if(!clickToSpin){
        wheelDragger[0].kill();
        currentWheelPos = oldWheelPos = null;
        gsap.to([wheel, valueContainer], {
          duration: 0.3,
          rotation: '0_short',
          onComplete: createDraggable
        })      
    }
      
       gsap.set(wheelSVG, {
          opacity: 1
        })
        gsap.to([wheel, valueContainer],{
          duration: 0.3,
          rotation: '0_short'
        })      

      toast.style.visibility = 'hidden';
      spinCount = 0;
      spinMultiplier = 2;
      gameResultsArray = [];


      showIntroText();
  }

    
}

Spin2WinWheel.reset = function(){

      document.querySelector('.wheel').innerHTML = "";
      document.querySelector('.wheelOutline').innerHTML = "";
      document.querySelector('.centerCircle').innerHTML = "";
      document.querySelector('.valueContainer').innerHTML = "";
      document.querySelector('.centerCircleImageContainer').innerHTML = "";
      gsap.set(['.wheel', '.valueContainer'], {
        rotation: 0
      })      
     gsap.set(['.wheelSVG', '.toast'],{        
          opacity: gsap.utils.wrap([1, 0])        
      })


  }
  Spin2WinWheel.hide = function(){

      gsap.set('.wheelContainer', {
        autoAlpha:0
      })

  }  

  Spin2WinWheel.remove = function(){

      document.body.removeChild(document.querySelector('.wheelContainer'));

  }  
/*
  Spin2WinWheel.checkCookie = function(callback){

    var xobj = new XMLHttpRequest();
    xobj.open('GET', 'settings.php?f=checkCookie', true); 
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText)
        //successfully called IP check
        //0 means they haven't been here before
        // if(xobj.responseText == 0){

        //   callback();

        // } else{
        //   alert("Please come back and play tomorrow!");
        //   Spin2WinWheel.remove();
          
        //   //hide your button here too
        // }
      }
    };
    xobj.send(null);

  }

  Spin2WinWheel.setCookie = function(){

    var xobj = new XMLHttpRequest();
    xobj.open('GET', 'settings.php?f=setCookie', true); 
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
        console.log(xobj.responseText)
        //successfully called IP check
        //0 means they haven't been here before
 
      }
    };    
    xobj.send(null);    
  }*/