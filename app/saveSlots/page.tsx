"use client";

import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const mostean = localFont({
  src: "../../public/assets/fonts/mostean.otf",
  weight: "700",
  display: "swap",
});

type SaveSlotInfo = {
  slot: number;
  meta?: {
    updatedAt: string;
  };
};

export default function SaveSlotsPage() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userId = "demo-user";
  const [slots, setSlots] = useState<SaveSlotInfo[]>([]);
  const [slotSelect, setSlotSelect] = useState<boolean>(false);
  const [whichSlot, setWhichSlot] = useState<number>(0);
  const [saveData, setSaveData] = useState<boolean>(false);

  const slotExists = (slot: number) => slots.some((s) => s.slot === slot);

  const continueGame = (slot: number) => {
    setSlotSelect(true);
    setWhichSlot(slot);
    setSaveData(true);
  };

  const newGame = async (slot: number) => {
    setSlotSelect(true);
    setWhichSlot(slot);
    setSaveData(false);
  };

  const deleteSave = async () => {
    const ok = confirm("This will delete the existing save. Are you sure?");
    if (!ok) return;

    await fetch(`/api/save?userId=${userId}&slot=${whichSlot}`, {
      method: "DELETE",
    });
    setSlots((prev) => prev.filter((s) => s.slot !== whichSlot));
    setSaveData(false);
    setSlotSelect(false);
  };

  const launchGame = () => {
    router.push(`/game?slot=${whichSlot}`);
  };

  useEffect(() => {
    const audio = new Audio("/assets/music/deus-ex-machina.mp3");
    audio.volume = 0.8;
    audio.loop = true;

    audio.play().catch((err) => {
      console.warn("Playback failed:", err);
    });

    audioRef.current = audio;

    fetch(`/api/save-slots?userId=${userId}`)
      .then((res) => res.json())
      .then(setSlots);

    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.src = "";
          audioRef.current.load();
        } catch (e) {
          console.warn("Audio cleanup failed:", e);
        }
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="save-slot-background">
      <div className="flex justify-around items-center mt-16">
        <div className={`hero mb-12 ${mostean.className}`}>Demon Scape</div>
        <div>
          {[1, 2, 3].map((slot) => (
            <div key={slot}>
              {slotExists(slot) ? (
                <button
                  onClick={() => continueGame(slot)}
                  type="button"
                  className={`${mostean.className} save-slot`}
                >
                  {userId}-{slot} <br></br> Neophyte, Level 1
                </button>
              ) : (
                <button
                  onClick={() => newGame(slot)}
                  type="button"
                  className={`${mostean.className} save-slot`}
                >
                  Create New Character
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {slotSelect ? (
        <div
          className={`${mostean.className} w-1/2 border-2 border-amber-500 text-white text-2xl float-right p-4 rounded-md mt-12 mr-12 flex justify-between`}
        >
          {saveData ? (
            <div className="flex h-88 flex-col items-center justify-between">
              <Image
                src="/assets/main-character1.png"
                alt="Char missing"
                width={256}
                height={256}
              />
              <div className="text-center">
                {userId}-{whichSlot} <br /> Neophyte, Level 1
              </div>
            </div>
          ) : (
            <div className="flex h-88 flex-col items-center justify-between">
              <Image
                src="/assets/new-char.png"
                alt="Char missing"
                width={256}
                height={256}
              />
              <div className="text-center">
                Fleeting Vibration <br /> Soul, Level 0{" "}
              </div>
            </div>
          )}
          {saveData ? (
            <div>
              <button
                onClick={() => launchGame()}
                type="button"
                className={`${mostean.className} save-slot`}
              >
                Continue Misery?
              </button>
              <button
                onClick={() => setSlotSelect(false)}
                type="button"
                className={`${mostean.className} save-slot`}
              >
                Back
              </button>
              <button
                onClick={() => deleteSave()}
                type="button"
                className={`${mostean.className} save-slot`}
              >
                Delete Character
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => launchGame()}
                type="button"
                className={`${mostean.className} save-slot`}
              >
                Enter....World..?
              </button>
              <button
                onClick={() => setSlotSelect(false)}
                type="button"
                className={`${mostean.className} save-slot`}
              >
                Back
              </button>
              <div className="background-div"></div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`${mostean.className} w-1/2 border-2 border-amber-500 text-white text-2xl float-right p-4 rounded-md mt-12 mr-12`}
        >
          The first and greatest trick of the Devil was to convince humanity he
          did not exist. Later he continued to whisper to those susceptible,
          those in a fallen state, under one of the seven great possessions. He
          whispered that the material is all there is and his followers preached
          the the cult of science. Through it, as was promised, great wealth and
          technology was created but as humanity lost it's belief, it's
          connection to the unseen realms, they forgot the age old war, the war
          for their souls. It was merely a matter of waiting, waiting until the
          Materium brought the majority of humanity under one of the great
          possessions, greed for those who strove for the material, lust for
          those lost in it, pride for those who had it, wrath for those who were
          denied it, Envy for those who measured it, Gluttony for those who
          loved it, and Sloth for those who were buried by it. Eventually the
          weight of the Seven Great Possessions crushed many, such that the
          vibrating light of their souls, that which protected their bodies,
          dimmed and slowed. When the compromised souls reached a critical mass
          of 33%, the Demons stopped keeping their possessions a secret. All but
          few fell in an instant. The feeding had begun. Compared to others,
          Earth has been a simple planet to annihilate.{" "}
        </div>
      )}
      <div className="flame-background"></div>
    </div>
  );
}
