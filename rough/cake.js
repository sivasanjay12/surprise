const {
  gsap,
  gsap: { to, timeline, set, delayedCall },
  Splitting,
} = window

Splitting()

const BTN = document.querySelector('.birthday-button__button')
const SOUNDS = {
  CHEER: new Audio(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/cheer.mp3'
  ),
  MATCH: new Audio(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/match-strike-trimmed.mp3'
  ),
  TUNE: new Audio(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/happy-birthday-trimmed.mp3'
  ),
  ON: new Audio('https://assets.codepen.io/605876/switch-on.mp3'),
  BLOW: new Audio(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/blow-out.mp3'
  ),
  POP: new Audio(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/pop-trimmed.mp3'
  ),
  HORN: new Audio(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/horn.mp3'
  ),
}

const EYES = document.querySelector('.cake__eyes')
const BLINK = eyes => {
  gsap.set(eyes, { scaleY: 1 })
  if (eyes.BLINK_TL) eyes.BLINK_TL.kill()
  eyes.BLINK_TL = new gsap.timeline({
    delay: Math.floor(Math.random() * 4) + 1,
    onComplete: () => BLINK(eyes),
  })
  eyes.BLINK_TL.to(eyes, {
    duration: 0.05,
    transformOrigin: '50% 50%',
    scaleY: 0,
    yoyo: true,
    repeat: 1,
  })
}
BLINK(EYES)

const FROSTING_TL = () =>
  timeline()
    .to(
      '#frosting',
      {
        scaleX: 1.015,
        duration: 0.25,
      },
      0
    )
    .to(
      '#frosting',
      {
        scaleY: 1,
        duration: 1,
      },
      0
    )
    .to(
      '#frosting',
      {
        duration: 1,
        morphSVG: '.cake__frosting--end',
      },
      0
    )
// Extract to sprinkle
const SPRINKLES_TL = () =>
  timeline().to('.cake__sprinkle', { scale: 1, duration: 0.06, stagger: 0.02 })
// Extract out to your own timeline
const SPIN_TL = () =>
  timeline()
    .set('.cake__frosting-patch', { display: 'block' })
    .to(
      ['.cake__frosting--duplicate', '.cake__sprinkles--duplicate'],
      { x: 0, duration: 1 },
      0
    )
    .to(
      ['.cake__frosting--start', '.cake__sprinkles--initial'],
      { x: 65, duration: 1 },
      0
    )
    .to('.cake__face', { duration: 1, x: -48.82 }, 0)

const flickerSpeed = 0.1
const FLICKER_TL = timeline()
  .to('.candle__flame-outer', {
    duration: flickerSpeed,
    repeat: -1,
    yoyo: true,
    morphSVG: '#flame-outer',
  })
  .to(
    '.candle__flame-inner',
    {
      duration: flickerSpeed,
      repeat: -1,
      yoyo: true,
      morphSVG: '#flame-inner',
    },
    0
  )

const SHAKE_TL = () =>
  timeline({ delay: 0.5 })
    .set('.cake__face', { display: 'none' })
    .set('.cake__face--straining', { display: 'block' })
    .to(
      '.birthday-button',
      {
        onComplete: () => {
          set('.cake__face--straining', { display: 'none' })
          set('.cake__face', { display: 'block' })
        },
        x: 1,
        y: 1,
        repeat: 13,
        duration: 0.1,
      },
      0
    )
    .to(
      '.cake__candle',
      {
        onComplete: () => {
          FLICKER_TL.play()
        },
        onStart: () => {
          SOUNDS.POP.play()
          delayedCall(0.2, () => SOUNDS.POP.play())
          delayedCall(0.4, () => SOUNDS.POP.play())
        },
        ease: 'Elastic.easeOut',
        duration: 0.2,
        stagger: 0.2,
        scaleY: 1,
      },
      0.2
    )
const FLAME_TL = () =>
  timeline({})
    .to('.cake__candle', { '--flame': 1, stagger: 0.2, duration: 0.1 })
    .to('body', { '--flame': 1, '--lightness': 5, duration: 0.2, delay: 0.2 })
const LIGHTS_OUT = () =>
  timeline().to('body', {
    onStart: () => SOUNDS.BLOW.play(),
    delay: 0.5,
    '--lightness': 0,
    duration: 0.1,
    '--glow-saturation': 0,
    '--glow-lightness': 0,
    '--glow-alpha': 1,
    '--transparency-alpha': 1,
  })

const RESET = () => {
  set('.char', {
    '--hue': () => Math.random() * 360,
    '--char-sat': 0,
    '--char-light': 0,
    x: 0,
    y: 0,
    opacity: 1,
  })
  set('body', {
    '--frosting-hue': Math.random() * 360,
    '--glow-saturation': 50,
    '--glow-lightness': 35,
    '--glow-alpha': 0.4,
    '--transparency-alpha': 0,
    '--flame': 0,
  })
  set('.cake__candle', { '--flame': 0 })
  to('body', {
    '--lightness': 50,
    duration: 0.25,
  })
  // SET THESE
  set('.cake__frosting--end', { opacity: 0 })
  set('#frosting', {
    transformOrigin: '50% 10%',
    scaleX: 0,
    scaleY: 0,
  })
  set('.cake__frosting-patch', { display: 'none' })
  set(['.cake__frosting--duplicate', '.cake__sprinkles--duplicate'], { x: -65 })
  set('.cake__face', { x: -110 })
  set('.cake__face--straining', { display: 'none' })
  set('.cake__sprinkle', {
    '--sprinkle-hue': () => Math.random() * 360,
    scale: 0,
    transformOrigin: '50% 50%',
  })
  set('.birthday-button', { scale: 0.6, x: 0, y: 0 })
  set('.birthday-button__cake', { display: 'none' })
  set('.cake__candle', { scaleY: 0, transformOrigin: '50% 100%' })
}
RESET()
const MASTER_TL = timeline({
  onStart: () => {
    SOUNDS.ON.play()
  },
  onComplete: () => {
    delayedCall(2, RESET)
    BTN.removeAttribute('disabled')
  },
  paused: true,
})
  .set('.birthday-button__cake', { display: 'block' })
  .to('.birthday-button', {
    onStart: () => SOUNDS.CHEER.play(),
    scale: 1,
    duration: 0.2,
  })
  .to('.char', { '--char-sat': 70, '--char-light': 65, duration: 0.2 }, 0)
  .to('.char', {
    onStart: () => SOUNDS.HORN.play(),
    delay: 0.75,
    y: () => gsap.utils.random(-100, -200),
    x: () => gsap.utils.random(-50, 50),
    duration: () => gsap.utils.random(0.5, 1),
  })
  .to('.char', { opacity: 0, duration: 0.25 }, '>-0.5')
  .add(FROSTING_TL())
  .add(SPRINKLES_TL())
  .add(SPIN_TL())
  .add(SHAKE_TL())
  .add(FLAME_TL(), 'FLAME_ON')
  .add(LIGHTS_OUT(), 'LIGHTS_OUT')

SOUNDS.TUNE.onended = SOUNDS.MATCH.onended = () => MASTER_TL.play()
MASTER_TL.addPause('FLAME_ON', () => SOUNDS.MATCH.play())
MASTER_TL.addPause('LIGHTS_OUT', () => SOUNDS.TUNE.play())
BTN.addEventListener('click', () => {
  BTN.setAttribute('disabled', true)
  MASTER_TL.restart()
})

SOUNDS.TUNE.muted = SOUNDS.MATCH.muted = SOUNDS.HORN.muted = SOUNDS.POP.muted = SOUNDS.CHEER.muted = SOUNDS.BLOW.muted = SOUNDS.ON.muted = true

const toggleAudio = () => {
  SOUNDS.TUNE.muted = SOUNDS.MATCH.muted = SOUNDS.POP.muted = SOUNDS.HORN.muted = SOUNDS.CHEER.muted = SOUNDS.BLOW.muted = SOUNDS.ON.muted = !SOUNDS
    .BLOW.muted
}

document.querySelector('#volume').addEventListener('input', toggleAudio)


let w = (c.width = window.innerWidth),
  h = (c.height = window.innerHeight),
  ctx = c.getContext("2d"),
  hw = w / 2;
(hh = h / 2),
  (opts = {
    // change the text in here //
    strings: ["HAPPY", "BIRTHDAY!", "to You"],
    charSize: 30,
    charSpacing: 35,
    lineHeight: 40,

    cx: w / 2,
    cy: h / 2,

fireworkPrevPoints: 10,
    fireworkBaseLineWidth: 5,
    fireworkAddedLineWidth: 8,
    fireworkSpawnTime: 200,
    fireworkBaseReachTime: 30,
    fireworkAddedReachTime: 30,
    fireworkCircleBaseSize: 20,
    fireworkCircleAddedSize: 10,
    fireworkCircleBaseTime: 30,
    fireworkCircleAddedTime: 30,
    fireworkCircleFadeBaseTime: 10,
    fireworkCircleFadeAddedTime: 5,
    fireworkBaseShards: 5,
    fireworkAddedShards: 5,
    fireworkShardPrevPoints: 3,
    fireworkShardBaseVel: 4,
    fireworkShardAddedVel: 2,
    fireworkShardBaseSize: 3,
    fireworkShardAddedSize: 3,
    gravity: 0.1,
    upFlow: -0.1
    })

    (calc = {
    totalWidth:
      opts.charSpacing *
      Math.max(opts.strings[0].length, opts.strings[1].length),
  }),
  (Tau = Math.PI * 2),
  (TauQuarter = Tau / 4),
  (letters = []);

ctx.font = opts.charSize + "px Verdana";

function Letter(char, x, y) {
  this.char = char;
  this.x = x;
  this.y = y;

  this.dx = -ctx.measureText(char).width / 2;
  this.dy = +opts.charSize / 2;

  this.fireworkDy = this.y - hh;

  var hue = (x / calc.totalWidth) * 360;

  this.color = "hsl(hue,80%,50%)".replace("hue", hue);
  this.lightAlphaColor = "hsla(hue,80%,light%,alp)".replace("hue", hue);
  this.lightColor = "hsl(hue,80%,light%)".replace("hue", hue);
  this.alphaColor = "hsla(hue,80%,50%,alp)".replace("hue", hue);

  this.reset();
}

Letter.prototype.reset = function () {
  this.phase = "firework";
  this.tick = 0;
  this.spawned = false;
  this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0;
  this.reachTime =
    (opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random()) |
    0;
  this.lineWidth =
    opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
  this.prevPoints = [[0, hh, 0]];
};
Letter.prototype.step = function () {
  if (this.phase === "firework") {
    if (!this.spawned) {
      ++this.tick;
      if (this.tick >= this.spawningTime) {
        this.tick = 0;
        this.spawned = true;
      }
    } else {
      ++this.tick;

      var linearProportion = this.tick / this.reachTime,
        armonicProportion = Math.sin(linearProportion * TauQuarter),
        x = linearProportion * this.x,
        y = hh + armonicProportion * this.fireworkDy;

      if (this.prevPoints.length > opts.fireworkPrevPoints)
        this.prevPoints.shift();

      this.prevPoints.push([x, y, linearProportion * this.lineWidth]);

      var lineWidthProportion = 1 / (this.prevPoints.length - 1);

      for (var i = 1; i < this.prevPoints.length; ++i) {
        var point = this.prevPoints[i],
          point2 = this.prevPoints[i - 1];

        ctx.strokeStyle = this.alphaColor.replace(
          "alp",
          i / this.prevPoints.length
        );
        ctx.lineWidth = point[2] * lineWidthProportion * i;
        ctx.beginPath();
        ctx.moveTo(point[0], point[1]);
        ctx.lineTo(point2[0], point2[1]);
        ctx.stroke();
      }

      if (this.tick >= this.reachTime) {
        this.phase = "contemplate";

        this.circleFinalSize =
          opts.fireworkCircleBaseSize +
          opts.fireworkCircleAddedSize * Math.random();
        this.circleCompleteTime =
          (opts.fireworkCircleBaseTime +
            opts.fireworkCircleAddedTime * Math.random()) |
          0;
        this.circleCreating = true;
        this.circleFading = false;

        this.circleFadeTime =
          (opts.fireworkCircleFadeBaseTime +
            opts.fireworkCircleFadeAddedTime * Math.random()) |
          0;
        this.tick = 0;
        this.tick2 = 0;

        this.shards = [];

        var shardCount =
            (opts.fireworkBaseShards +
              opts.fireworkAddedShards * Math.random()) |
            0,
          angle = Tau / shardCount,
          cos = Math.cos(angle),
          sin = Math.sin(angle),
          x = 1,
          y = 0;

        for (var i = 0; i < shardCount; ++i) {
          var x1 = x;
          x = x * cos - y * sin;
          y = y * cos + x1 * sin;

          this.shards.push(new Shard(this.x, this.y, x, y, this.alphaColor));
        }
      }
    }
  } else if (this.phase === "contemplate") {
    ++this.tick;

    if (this.circleCreating) {
      ++this.tick2;
      var proportion = this.tick2 / this.circleCompleteTime,
        armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

      ctx.beginPath();
      ctx.fillStyle = this.lightAlphaColor
        .replace("light", 50 + 50 * proportion)
        .replace("alp", proportion);
      ctx.beginPath();
      ctx.arc(this.x, this.y, armonic * this.circleFinalSize, 0, Tau);
      ctx.fill();

      if (this.tick2 > this.circleCompleteTime) {
        this.tick2 = 0;
        this.circleCreating = false;
        this.circleFading = true;
      }
    } else if (this.circleFading) {
      ctx.fillStyle = this.lightColor.replace("light", 70);
      ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

      ++this.tick2;
      var proportion = this.tick2 / this.circleFadeTime,
        armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

      ctx.beginPath();
      ctx.fillStyle = this.lightAlphaColor
        .replace("light", 100)
        .replace("alp", 1 - armonic);
      ctx.arc(this.x, this.y, this.circleFinalSize, 0, Tau);
      ctx.fill();

      if (this.tick2 >= this.circleFadeTime) this.circleFading = false;
    } else {
      ctx.fillStyle = this.lightColor.replace("light", 70);
      ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
    }

    for (var i = 0; i < this.shards.length; ++i) {
      this.shards[i].step();

      if (!this.shards[i].alive) {
        this.shards.splice(i, 1);
        --i;
      }}}}