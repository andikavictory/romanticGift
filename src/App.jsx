import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Envelope from "./components/Envelope";


function App() {
  const [page, setPage] = useState("opening");
  const [rejectIndex, setRejectIndex] = useState(0);
  const [buttonSize, setButtonSize] = useState(1);
  const [heartCount, setHeartCount] = useState(0);
  const [popPosition, setPopPosition] = useState(null);
  const [particles, setParticles] = useState([]);
  const [isPopping, setIsPopping] = useState(false);
  const [heartPosition, setHeartPosition] = useState({
      x: 0,
      y: 0
    });
  const [giftStage, setGiftStage] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [showLetter, setShowLetter] = useState(false);
  const [letterAnimation, setLetterAnimation] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  const [openEnvelope, setOpenEnvelope] = useState(false);
  const [zoomScene, setZoomScene] = useState(false);

  const [showMagic, setShowMagic] = useState(false);
  const [showEnvelopeRise, setShowEnvelopeRise] = useState(false);
  const [envelopeFront, setEnvelopeFront] = useState(false);
  const [expandLetter, setExpandLetter] = useState(false);
  const [showLetterText, setShowLetterText] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

const bgMusic = useRef(new Audio("/romantic.mp3"));

  const clickSound = useRef(new Audio("/click.mp3"));
  const heartSound = useRef(new Audio("/heart-pop.mp3"));
  const giftSound = useRef(new Audio("/gift-open.mp3"));
  const magicSound = useRef(new Audio("/magic.mp3"));
  const envelopeSound = useRef(new Audio("/envelope-open.mp3"));
  const revealSound = useRef(new Audio("/reveal.mp3"));
  const finishSound = useRef(new Audio("/ding.mp3"));
  const rejectSound = useRef(new Audio("/eits.mp3"));
  const correctSound = useRef(new Audio("/yee.mp3"));
  const typingSound = useRef(new Audio("/typing.mp3"));


  const startGiftAnimation = () => {

    giftSound.current.play();
    giftSound.current.volume = 0.3;

    setTimeout(() => {
    giftSound.current.pause();
    giftSound.current.currentTime = 0;
  }, 2000);

    setGiftStage(1);

    setTimeout(() => {
      setGiftStage(2);
    }, 1000);

    setTimeout(() => {

      magicSound.current.play();

      setShowMagic(true);

    }, 800);

  setTimeout(() => {
    setShowLetter(true);
  }, 1200);

  setTimeout(() => {
    setShowEnvelopeRise(true);
  }, 1500);

  setTimeout(() => {
  setEnvelopeFront(true);
  }, 2600);

  setTimeout(() => {
    setShowGlow(true);
  }, 2500);

  setTimeout(() => {

    envelopeSound.current.play();
    envelopeSound.current.volume = 0.3;
    envelopeSound.current.currentTime = 1;
    setTimeout(() => {
      envelopeSound.current.pause();
      envelopeSound.current.currentTime = 0;
    }, 2000);

    setOpenEnvelope(true);

  }, 4500);

  setTimeout(() => {
    setLetterAnimation(true);
  }, 6500);

  // tunggu surat selesai naik
  setTimeout(() => {

    revealSound.current.play();

    setShowFlash(true);

  }, 9200);

  setTimeout(() => {
    setShowLetterText(true);
  }, 9600);

  setTimeout(() => {
    setShowFlash(false);
  }, 10200);
};
  


    useEffect(() => {

      moveHeart();

    }, []);

  useEffect(() => {

    if (!showLetterText) return;

    setDisplayText("");

    let index = 0;

    if (!showLetterText) return;

    typingSound.current.currentTime = 0;
    typingSound.current.volume = 1;
    typingSound.current.play();

    const interval = setInterval(() => {

      setDisplayText(
        fullLetter.slice(0, index)
      );

      index++;

      if (index > fullLetter.length) {

        typingSound.current.pause();
        typingSound.current.currentTime = 0;

        clearInterval(interval);
      }

    }, 40);

    return () => clearInterval(interval);

  }, [showLetterText]);


  const buttonOffsets = [
    0,
    80,
    -80,
    150,
    -150,
    0
  ];

  const rejectMessages = [
    "Yakin gak peduli? 🥺",
    "Serius nih? 😭",
    "Aku bikinnya khusus buat kamu loh ❤️",
    "Minimal penasaran dikit dong 😏",
    "Ada seseorang yang sayang banget sama kamu di balik hadiah ini ❤️",
    "Yaudah deh, pencet 'Mau Lihat' aja 😆"
  ];
const fullLetter = `Hai kamu ❤️

Aku tahu kita belum lama kenal.

Belum pernah jalan bareng.
Belum pernah foto bareng.

Tapi aku bersyukur bisa mengenal kamu.

Dan karena hari ini adalah hari yang spesial,
aku ingin memberikan sesuatu yang kubuat khusus untukmu.

Semoga kamu suka ya ❤️`;

  const moveHeart = () => {
  setHeartPosition({
    x: Math.random() * 250 - 125,
    y: Math.random() * 250 - 125
  });
};

const icons = [
  "💖",
  "💕",
  "💗",
  "💞",
  "✨"
];

const createParticles = (x, y) => {

  const newParticles = [];

  for (let i = 0; i < 8; i++) {

    newParticles.push({
      id: Date.now() + i,

      x,
      y,

      icon: icons[
        Math.floor(Math.random() * icons.length)
      ],

      dx: (Math.random() - 0.5) * 120,
      dy: (Math.random() - 0.5) * 120
    });

  }

  setParticles(newParticles);

  setTimeout(() => {
    setParticles([]);
  }, 600);

};

const playClick = () => {
  clickSound.current.currentTime = 1;
  clickSound.current.volume = 0.3;
  clickSound.current.play();
};

  if (page === "opening") {
    return (
      <div className="container">
      <div className="card">
        <h1>Aku punya sesuatu buat kamu ❤️</h1>

        <button
          onClick={() => {
            playClick();
            bgMusic.current.play();
            bgMusic.current.volume = 0.3;
            setPage("heartGame");
          }}
        >
          Mau Lihat
        </button>

       <button
        onClick={() => {
          rejectSound.current.play();
          rejectSound.current.volume = 0.3;
          setTimeout(() => {
            rejectSound.current.pause();
          }, 400);
          setPage("reject");
        }}
      >
          Gak Peduli
        </button>
      </div>
      </div>
    );
  }

  if (page === "reject") {
    return (
      <div className="container">
      <div className="card">
        <h1>{rejectMessages[rejectIndex]}</h1>

      <button
        style={{
          transform: `scale(${buttonSize})`,
          background: "#ff4f8b",
          color: "white",
          fontWeight: "bold"
        }}
        onClick={() => {
          correctSound.current.play();
          correctSound.current.volume = 0.3;
          setTimeout(() => {
            correctSound.current.pause();
          }, 1000);
          setPage("heartGame")}}
      >
        ❤️ Mau Lihat Kadonya
      </button>

        {rejectIndex < 5 && (
          <button
            style={{
              transform: `
                translateX(${buttonOffsets[rejectIndex] || 0}px)
                scale(${1.2 - buttonSize * 0.2})
              `,
              background: "#dddddd"
            }}
            onClick={() => {
              rejectSound.current.play();
              rejectSound.current.volume = 0.3;
              setTimeout(() => {
                rejectSound.current.pause();
              }, 400);
              rejectSound.current.currentTime = 0;

                if (rejectIndex === rejectMessages.length - 2) {

                  // klik terakhir sebelum tombol hilang
                heartSound.current.currentTime = 0;
                heartSound.current.volume = 0.1;
                heartSound.current.play();
                 rejectSound.current.pause();

                }
              if (rejectIndex < rejectMessages.length - 1) {
                setRejectIndex(rejectIndex + 1);
                setButtonSize(buttonSize + 0.2);
              }
            }}
          >
          Tetap Gak Peduli 🙄
      </button>
      )}
      </div>
      </div>
    );
  }

    if (page === "heartGame") {
      return (
        <div className="container">
          <div className="card">

            <h1>
              Tangkap 10 hati dulu ❤️
            </h1>

            <h2>
              {heartCount}/10
            </h2>

            <div className="heart-game">

              {particles.map((particle) => (
            <span
              key={particle.id}
              className="particle"
              style={{
                left: particle.x,
                top: particle.y,

                "--dx": `${particle.dx}px`,
                "--dy": `${particle.dy}px`
              }}
            >
              {particle.icon}
            </span>
            ))}

              {isPopping && (
                <div
                  className="explosion"
                style={{
                  left: `${popPosition?.x}px`,
                  top: `${popPosition?.y}px`
                }}
                >
                 
                </div>
              )}
              {heartCount < 10 && (
                <button
                  className="heart-floating"
                  style={{
                    transform: `
                      translate(
                        ${heartPosition.x}px,
                        ${heartPosition.y}px
                      )
                    `
                  }}
                  onClick={(e) => {

                    heartSound.current.currentTime = 0;
                    heartSound.current.volume = 0.1;
                    heartSound.current.play();

                    const rect = e.currentTarget.getBoundingClientRect();

                    const parentRect =
                      e.currentTarget.parentElement.getBoundingClientRect();

                    createParticles(
                      rect.left - parentRect.left + rect.width / 2,
                      rect.top - parentRect.top + rect.height / 2
                    );

                    setIsPopping(true);

                    setTimeout(() => {
                      setHeartCount(prev => prev + 1);
                      moveHeart();
                      setIsPopping(false);
                    }, 300);

                  }}
                >
                  {isPopping ? "" : "❤️"}
                </button>
              )}

            </div>

            {heartCount >= 10 && (
              <button
                onClick={() => {
                  playClick();
                  setPage("gift")}}
              >
                🎁 Buka Kadonya
              </button>
            )}

          </div>
        </div>
      );
    }

if (page === "gift") {

  const bokeh = Array.from(
    { length: 15 }
  );

  return (
      <div className="gift-scene">
      <div className="love-background">
        ❤️ 💖 💕 ✨ ❤️ 💖 💕
     </div>

      {showLetterText && (
      <motion.div
        className="fullscreen-letter"
        initial={{
          opacity: 0,
          scale: 0.8
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 2
        }}
      >
      <div className="letter-paper">

      <p className="typing-text">
        {displayText}
      </p>

      <button
        onClick={() => {
          bgMusic.current.pause();
          setPage("video1")}}
        style={{
          opacity:
            displayText.length === fullLetter.length
              ? 1
              : 0,
          pointerEvents:
            displayText.length === fullLetter.length
              ? "auto"
              : "none",
          transition: "0.5s"
        }}
      >
        Lanjut ❤️
      </button>

      </div>
      </motion.div>
    )}

        {bokeh.map((_, i) => (

          <motion.div
            key={i}
            className="bokeh"

            style={{
              left: `${Math.random() * 100}%`
            }}

            initial={{
              y: 500,
              opacity: 0
            }}

            animate={{
              y: -500,
              opacity: [0,1,0]
            }}

            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.4
            }}
          />

        ))}
      {showGlow && (
        <div className="romantic-glow"></div>
      )}
      {showFlash && (
        <div className="screen-flash"></div>
      )}
        <motion.div
          className="card"
          animate={{
            opacity: showLetterText ? 0 : 1,
            scale: showLetterText ? 0.8 : 1
          }}
          transition={{
            duration: 1
          }}
        >
    
          <motion.div
            className="gift-box"

            animate={
              giftStage >= 2
                ? {
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  }
                : {}
            }

            transition={{
              duration: 0.8
            }}
          >
          <motion.div
            className="gift-lid"

            animate={
              giftStage >= 1
                ? {
                    rotateX: 120,
                    rotateZ: -15,
                    y: -40
                  }
                : {
                    rotateX: 0,
                    rotateZ: 0,
                    y: 0
                  }
            }

            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
          <div className="gift-body">

            

            {showMagic && (
              <div className="magic-light"></div>
            )}
            {showMagic && (
              <div className="light-rays"></div>
            )}
            <div className="ribbon-vertical"></div>
            <div className="ribbon-horizontal"></div>
          </div>
        </motion.div>

        {showLetter && (
            <div className="letter-popup">

              <motion.div
                  className={`envelope-wrapper ${
                    envelopeFront
                      ? "front-layer"
                      : "back-layer"
                  }`}
                animate={{
                  y: showEnvelopeRise ? -140 : 40,
                  scale: openEnvelope ? 1.15 : 1,
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut"
                }}
              >
                <Envelope open={openEnvelope} />
              </motion.div>

              {letterAnimation && (
                <>
                  <motion.div
                    className="floating-heart"
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -350, opacity: 1 }}
                    transition={{ duration: 3 }}
                  >
                    💕
                  </motion.div>

                  <motion.div
                    className="floating-heart"
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                      y: -320,
                      x: 50,
                      opacity: 1
                    }}
                    transition={{ duration: 3 }}
                  >
                    ✨
                  </motion.div>

                  <motion.div
                    className="floating-heart"
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                      y: -360,
                      x: -50,
                      opacity: 1
                    }}
                    transition={{ duration: 3 }}
                  >
                    💖
                  </motion.div>
                </>
              )}

            </div>
          )}

        {giftStage === 0 && (
          <>
            <h2>
              Ada hadiah kecil untukmu ❤️
            </h2>

            <button onClick={startGiftAnimation}>
              Buka Hadiah
            </button>
          </>
        )}

      </motion.div>
    </div>
  );
}


if (page === "video1") {

  return (
    <div className="container">
      <div className="card">

        <h1>
          🎥 Video Pertama Untuk Kamu ❤️
        </h1>

      <iframe
        width="100%"
        height="400"
        src="https://www.youtube.com/embed/54Sn0PL0vYw"
        title="Video 1"
        allowFullScreen
      ></iframe>

        <button
          onClick={() => {
            bgMusic.current.pause();
            setPage("video2")}}
        >
          Lanjut Video Berikutnya ❤️
        </button>

      </div>
    </div>
  );
}

if (page === "video2") {

  return (
    <div className="container">
      <div className="card">

        <h1>
          🎥 Video Kedua Untuk Kamu ❤️
        </h1>

      <iframe
        width="100%"
        height="400"
        src="https://www.youtube.com/embed/Uwg8PliHnsQ"
        title="Video 2"
        allowFullScreen
      ></iframe>

        <button
          onClick={() => {
          bgMusic.current.play();
          setPage("ending")}}
        >
          Selesai ❤️
        </button>

      </div>
    </div>
  );
}

if (page === "ending") {

  return (
    <div className="container">
      <div className="card">

        <h1>
          Terima kasih sudah membuka hadiah ini ❤️
        </h1>

        <p>
          Semoga hari ulang tahunmu menyenangkan.
        </p>

        <p>
          Dan semoga senyum kamu hari ini
          sedikit lebih lebar dari biasanya 😊
        </p>

        <button>
          ❤️
        </button>

      </div>
    </div>
  );
}
}

export default App;