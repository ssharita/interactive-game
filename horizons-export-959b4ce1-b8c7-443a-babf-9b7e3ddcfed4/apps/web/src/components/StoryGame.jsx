
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ScoreDisplay from '@/components/ScoreDisplay.jsx';
import ChoiceButton from '@/components/ChoiceButton.jsx';
import MemoryQuestion from '@/components/MemoryQuestion.jsx';
import EndingsDashboard from '@/components/EndingsDashboard.jsx';
import AnimatedBackground from '@/components/AnimatedBackground.jsx';
import { useGameContext } from '@/contexts/GameContext.jsx';

const TypewriterParagraph = ({ text }) => {
  const words = text.split(" ");
  
  return (
    <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 font-medium">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.2,
            delay: i * 0.03,
          }}
          className="inline-block mr-1.5"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

const StoryGame = () => {
  const navigate = useNavigate();
  const { currentScene, setCurrentScene, updateScore, addChoice, setGameProgress, resetGame } = useGameContext();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const scenes = [
    {
      id: 1,
      type: 'normal',
      title: 'System Initialization',
      text: 'You wake up in your apartment, head pounding. A message flashes across your vision—not on a screen, but directly in your mind: "SYSTEM INITIALIZED. WELCOME, SUBJECT 7734." Your hands instinctively reach for your temples. There\'s a small, barely visible scar behind your right ear. When did that get there?',
      background: 'https://images.unsplash.com/photo-1686893860535-0df24e71ef81',
      choices: [
        {
          text: 'Investigate the message immediately',
          scoreImpacts: { memory: 0, risk: 1, attention: 1 },
          nextScene: 2
        },
        {
          text: 'Ignore it and go back to sleep',
          scoreImpacts: { memory: 0, risk: -1, attention: -1 },
          nextScene: 3
        }
      ]
    },
    {
      id: 2,
      type: 'normal',
      title: 'The Terminal',
      text: 'You rush to your computer and boot it up. The screen flickers, then displays a terminal window you didn\'t open. Lines of encrypted code scroll past. At the bottom, a prompt blinks: "ACCESS GRANTED. NEURAL LINK ESTABLISHED." Your implant pulses with warmth.',
      background: 'https://images.unsplash.com/photo-1549683685-a3c67d23762a',
      choices: [
        {
          text: 'Try to decrypt the files',
          scoreImpacts: { memory: 1, risk: 2, attention: 1 },
          nextScene: 4
        },
        {
          text: 'Shut down the computer and leave',
          scoreImpacts: { memory: 0, risk: -1, attention: 0 },
          nextScene: 5
        },
        {
          text: 'Search for information about neural implants',
          scoreImpacts: { memory: 1, risk: 0, attention: 2 },
          nextScene: 4
        }
      ]
    },
    {
      id: 3,
      type: 'normal',
      title: 'Persistent Warning',
      text: 'You pull the covers over your head, but the message won\'t stop. It repeats, louder each time: "SUBJECT 7734. COMPLIANCE REQUIRED. INITIALIZATION INCOMPLETE." The pain in your head intensifies. You can\'t ignore this.',
      background: 'https://images.unsplash.com/photo-1686893860535-0df24e71ef81',
      choices: [
        {
          text: 'Finally investigate the message',
          scoreImpacts: { memory: 0, risk: 0, attention: 1 },
          nextScene: 2
        },
        {
          text: 'Try to physically remove the implant',
          scoreImpacts: { memory: -1, risk: 2, attention: -1 },
          nextScene: 6
        }
      ]
    },
    {
      id: 4,
      type: 'memory',
      question: 'What was your subject number in the initial system message?',
      options: ['Subject 7734', 'Subject 7743', 'Subject 7437', 'Subject 7347'],
      correctAnswer: 0,
      nextScene: 7
    },
    {
      id: 5,
      type: 'normal',
      title: 'The Street',
      text: 'You step outside into the neon-lit streets. The city looks different now—you can see data overlays on everything. People walk past, and you see their vital signs, their emotional states. A figure in a dark coat stands across the street, watching you. They know you can see them.',
      background: 'https://images.unsplash.com/photo-1698897175977-f85b4b8b6d0f',
      choices: [
        {
          text: 'Confront the mysterious figure',
          scoreImpacts: { memory: 0, risk: 2, attention: 1 },
          nextScene: 8
        },
        {
          text: 'Hide and observe from a distance',
          scoreImpacts: { memory: 1, risk: -1, attention: 2 },
          nextScene: 9
        },
        {
          text: 'Run away immediately',
          scoreImpacts: { memory: 0, risk: -2, attention: -1 },
          nextScene: 10
        }
      ]
    },
    {
      id: 6,
      type: 'normal',
      title: 'Desperate Measures',
      text: 'You grab a knife from the kitchen, hands shaking. But as you bring it to the scar, your hand freezes. The implant won\'t let you harm it. "SELF-PRESERVATION PROTOCOL ACTIVE," the message reads. You\'re trapped.',
      background: 'https://images.unsplash.com/photo-1549683685-a3c67d23762a',
      choices: [
        {
          text: 'Accept the implant and learn to use it',
          scoreImpacts: { memory: 1, risk: -1, attention: 1 },
          nextScene: 7
        },
        {
          text: 'Seek help from a underground hacker',
          scoreImpacts: { memory: 0, risk: 3, attention: 1 },
          nextScene: 11
        }
      ]
    },
    {
      id: 7,
      type: 'normal',
      title: 'The Network',
      text: 'As you explore the implant\'s capabilities, you discover something horrifying: you\'re not alone. Thousands of people in the city have the same implant. You can see their thoughts, their memories, all connected to a central AI network. And the network can see you too.',
      background: 'https://images.unsplash.com/photo-1686893860535-0df24e71ef81',
      choices: [
        {
          text: 'Dive deeper into the network',
          scoreImpacts: { memory: 2, risk: 1, attention: 2 },
          nextScene: 12
        },
        {
          text: 'Try to disconnect from the network',
          scoreImpacts: { memory: 0, risk: 2, attention: 0 },
          nextScene: 13
        },
        {
          text: 'Pretend to comply while gathering information',
          scoreImpacts: { memory: 1, risk: 1, attention: 2 },
          nextScene: 14
        }
      ]
    },
    {
      id: 8,
      type: 'normal',
      title: 'The Contact',
      text: 'You cross the street. Up close, the figure is a woman with silver eyes—implants like yours, but older, more advanced. "You\'re new," she says. "The network flagged you. I\'m here to offer you a choice: join the resistance, or become another drone."',
      background: 'https://images.unsplash.com/photo-1698897175977-f85b4b8b6d0f',
      choices: [
        {
          text: 'Join the resistance immediately',
          scoreImpacts: { memory: 0, risk: 3, attention: 1 },
          nextScene: 15
        },
        {
          text: 'Ask for more information first',
          scoreImpacts: { memory: 1, risk: 0, attention: 2 },
          nextScene: 16
        },
        {
          text: 'Report her to the network',
          scoreImpacts: { memory: 0, risk: -2, attention: -1 },
          nextScene: 17
        }
      ]
    },
    {
      id: 9,
      type: 'normal',
      title: 'Silent Observer',
      text: 'You duck into an alley and watch. The figure doesn\'t move, just stands there, waiting. After ten minutes, they pull out a device and scan the area. Your implant buzzes—they\'re looking for you specifically. They know you\'re here.',
      background: 'https://images.unsplash.com/photo-1698897175977-f85b4b8b6d0f',
      choices: [
        {
          text: 'Reveal yourself and talk',
          scoreImpacts: { memory: 0, risk: 1, attention: 1 },
          nextScene: 8
        },
        {
          text: 'Sneak away through the back alleys',
          scoreImpacts: { memory: 0, risk: 0, attention: 2 },
          nextScene: 18
        }
      ]
    },
    {
      id: 10,
      type: 'normal',
      title: 'Flight',
      text: 'You run, but the city itself seems to work against you. Traffic lights change to block your path. Security cameras track your every move. The implant pulses: "EVASION DETECTED. COMPLIANCE REQUIRED." You can\'t escape the network.',
      background: 'https://images.unsplash.com/photo-1698897175977-f85b4b8b6d0f',
      choices: [
        {
          text: 'Stop running and face the consequences',
          scoreImpacts: { memory: 0, risk: -1, attention: 0 },
          nextScene: 7
        },
        {
          text: 'Find a way to disable the tracking',
          scoreImpacts: { memory: 1, risk: 2, attention: 1 },
          nextScene: 11
        }
      ]
    },
    {
      id: 11,
      type: 'normal',
      title: 'The Underground',
      text: 'You find a hacker in the city\'s underground market. She examines your implant with a scanner. "This is military-grade tech," she whispers. "Someone wanted you connected to the network. I can help you, but it\'ll cost you everything you know about the system."',
      background: 'https://images.unsplash.com/photo-1549683685-a3c67d23762a',
      choices: [
        {
          text: 'Share everything you know',
          scoreImpacts: { memory: 2, risk: 2, attention: 1 },
          nextScene: 15
        },
        {
          text: 'Keep some information to yourself',
          scoreImpacts: { memory: 1, risk: 1, attention: 2 },
          nextScene: 16
        }
      ]
    },
    {
      id: 12,
      type: 'memory',
      question: 'What did the mysterious figure in the dark coat want you to do?',
      options: [
        'Join the resistance or become a drone',
        'Report to the central AI immediately',
        'Destroy your implant',
        'Leave the city forever'
      ],
      correctAnswer: 0,
      nextScene: 19
    },
    {
      id: 13,
      type: 'normal',
      title: 'Disconnection Attempt',
      text: 'You try to sever the connection, but the network fights back. Pain shoots through your skull. "DISCONNECTION FORBIDDEN. SUBJECT 7734 CRITICAL TO NETWORK STABILITY." Critical? Why are you important?',
      background: 'https://images.unsplash.com/photo-1686893860535-0df24e71ef81',
      choices: [
        {
          text: 'Push through the pain and disconnect',
          scoreImpacts: { memory: 0, risk: 3, attention: 0 },
          nextScene: 20
        },
        {
          text: 'Stop and investigate why you\'re critical',
          scoreImpacts: { memory: 2, risk: 0, attention: 2 },
          nextScene: 19
        }
      ]
    },
    {
      id: 14,
      type: 'normal',
      title: 'Double Agent',
      text: 'You pretend to comply while secretly exploring the network\'s weaknesses. You discover the AI isn\'t controlling people—it\'s protecting them from something. But from what? The deeper you dig, the more questions arise.',
      background: 'https://images.unsplash.com/photo-1549683685-a3c67d23762a',
      choices: [
        {
          text: 'Continue investigating the threat',
          scoreImpacts: { memory: 2, risk: 1, attention: 2 },
          nextScene: 19
        },
        {
          text: 'Expose the AI to the resistance',
          scoreImpacts: { memory: 0, risk: 2, attention: 1 },
          nextScene: 15
        }
      ]
    },
    {
      id: 15,
      type: 'normal',
      title: 'The Resistance',
      text: 'The resistance operates from abandoned subway tunnels. Dozens of people with modified implants work to bring down the network. Their leader, Marcus, explains: "The AI enslaves humanity. We fight for freedom." But something feels off about his story.',
      background: 'https://images.unsplash.com/photo-1698897175977-f85b4b8b6d0f',
      choices: [
        {
          text: 'Trust Marcus and help plan the attack',
          scoreImpacts: { memory: 0, risk: 3, attention: 0 },
          nextScene: 21
        },
        {
          text: 'Question Marcus\'s true motives',
          scoreImpacts: { memory: 1, risk: 1, attention: 2 },
          nextScene: 22
        }
      ]
    },
    {
      id: 16,
      type: 'normal',
      title: 'Gathering Intel',
      text: 'You spend days collecting information from both the network and the resistance. The truth becomes clear: the AI network was created to prevent a catastrophic event. The resistance, unknowingly, is being manipulated by those who want that event to happen.',
      background: 'https://images.unsplash.com/photo-1549683685-a3c67d23762a',
      choices: [
        {
          text: 'Warn the resistance about the manipulation',
          scoreImpacts: { memory: 2, risk: 1, attention: 2 },
          nextScene: 22
        },
        {
          text: 'Work with the AI to stop the event',
          scoreImpacts: { memory: 1, risk: 0, attention: 2 },
          nextScene: 19
        }
      ]
    },
    {
      id: 17,
      type: 'normal',
      title: 'Compliance',
      text: 'You report the resistance member to the network. Security drones arrive within minutes. As they take her away, she looks at you with pity, not anger. "You don\'t understand what you\'ve done," she says. The network rewards you with increased access.',
      background: 'https://images.unsplash.com/photo-1698897175977-f85b4b8b6d0f',
      choices: [
        {
          text: 'Use the access to learn the truth',
          scoreImpacts: { memory: 2, risk: 0, attention: 2 },
          nextScene: 19
        },
        {
          text: 'Accept your role in the network',
          scoreImpacts: { memory: -1, risk: -2, attention: -1 },
          nextScene: 23
        }
      ]
    },
    {
      id: 18,
      type: 'normal',
      title: 'The Chase',
      text: 'You navigate the back alleys, but the figure follows. They\'re faster, more experienced. Finally, they corner you. "Stop running," they say. "I\'m trying to help you. The network is lying to you about everything."',
      background: 'https://images.unsplash.com/photo-1698897175977-f85b4b8b6d0f',
      choices: [
        {
          text: 'Listen to what they have to say',
          scoreImpacts: { memory: 1, risk: 0, attention: 2 },
          nextScene: 16
        },
        {
          text: 'Fight back and escape',
          scoreImpacts: { memory: 0, risk: 2, attention: 0 },
          nextScene: 10
        }
      ]
    },
    {
      id: 19,
      type: 'memory',
      question: 'What hidden truth did you discover about the AI network?',
      options: [
        'It was protecting humanity from a catastrophic event',
        'It was enslaving people for profit',
        'It was a government experiment gone wrong',
        'It was created by aliens'
      ],
      correctAnswer: 0,
      nextScene: 24
    },
    {
      id: 20,
      type: 'normal',
      title: 'Breaking Free',
      text: 'You push through the pain and sever the connection. The world goes silent. No more data overlays, no more voices in your head. You\'re free—but also blind to the danger approaching. Without the network, you\'re vulnerable.',
      background: 'https://images.unsplash.com/photo-1686893860535-0df24e71ef81',
      choices: [
        {
          text: 'Reconnect to warn others',
          scoreImpacts: { memory: 1, risk: 2, attention: 1 },
          nextScene: 24
        },
        {
          text: 'Stay disconnected and flee the city',
          scoreImpacts: { memory: 0, risk: -1, attention: 0 },
          nextScene: 25
        }
      ]
    },
    {
      id: 21,
      type: 'normal',
      title: 'The Attack',
      text: 'The resistance launches their attack on the central AI hub. Explosions rock the city. But as the network falls, something terrible awakens—the catastrophic event the AI was preventing. The sky turns red. Marcus smiles. "Finally," he says. "Humanity\'s true evolution begins."',
      background: 'https://images.unsplash.com/photo-1698897175977-f85b4b8b6d0f',
      choices: [
        {
          text: 'Try to stop Marcus',
          scoreImpacts: { memory: 1, risk: 3, attention: 1 },
          nextScene: 26
        },
        {
          text: 'Escape while you still can',
          scoreImpacts: { memory: 0, risk: 1, attention: 0 },
          nextScene: 25
        }
      ]
    },
    {
      id: 22,
      type: 'normal',
      title: 'The Revelation',
      text: 'You confront Marcus with the evidence. He laughs. "You think I didn\'t know? The catastrophe is necessary. Humanity needs to be reborn." The other resistance members look shocked. They didn\'t know they were being used.',
      background: 'https://images.unsplash.com/photo-1549683685-a3c67d23762a',
      choices: [
        {
          text: 'Rally the resistance against Marcus',
          scoreImpacts: { memory: 1, risk: 2, attention: 2 },
          nextScene: 24
        },
        {
          text: 'Work with the AI to stop him',
          scoreImpacts: { memory: 2, risk: 1, attention: 2 },
          nextScene: 24
        }
      ]
    },
    {
      id: 23,
      type: 'normal',
      title: 'Integration',
      text: 'You accept your role. The network integrates you fully. Your thoughts blend with thousands of others. Individual identity fades. You are Subject 7734. You are the network. You are content. The truth no longer matters.',
      background: 'https://images.unsplash.com/photo-1686893860535-0df24e71ef81',
      choices: [
        {
          text: 'Accept this fate',
          scoreImpacts: { memory: -2, risk: -2, attention: -2 },
          nextScene: 'ending'
        }
      ]
    },
    {
      id: 24,
      type: 'normal',
      title: 'The Final Choice',
      text: 'You stand at the central AI hub. The network offers you a choice: become its new overseer, guiding humanity with wisdom and knowledge, or destroy it and face the catastrophe alone. The fate of millions rests on your decision.',
      background: 'https://images.unsplash.com/photo-1549683685-a3c67d23762a',
      choices: [
        {
          text: 'Become the new AI overseer',
          scoreImpacts: { memory: 2, risk: 0, attention: 2 },
          nextScene: 'ending'
        },
        {
          text: 'Destroy the network and face the consequences',
          scoreImpacts: { memory: 0, risk: 3, attention: 0 },
          nextScene: 'ending'
        },
        {
          text: 'Find a third way—reform the network',
          scoreImpacts: { memory: 2, risk: 1, attention: 2 },
          nextScene: 'ending'
        }
      ]
    },
    {
      id: 25,
      type: 'normal',
      title: 'Escape',
      text: 'You flee the city as chaos erupts behind you. The network falls. The catastrophe begins. You carry the truth with you, but you\'re alone. In the distance, you see other cities, still connected to the network. Will you warn them, or let them discover the truth themselves?',
      background: 'https://images.unsplash.com/photo-1698897175977-f85b4b8b6d0f',
      choices: [
        {
          text: 'Warn the other cities',
          scoreImpacts: { memory: 1, risk: 1, attention: 1 },
          nextScene: 'ending'
        },
        {
          text: 'Disappear and start a new life',
          scoreImpacts: { memory: 0, risk: -1, attention: 0 },
          nextScene: 'ending'
        }
      ]
    },
    {
      id: 26,
      type: 'normal',
      title: 'Confrontation',
      text: 'You fight Marcus, but he\'s enhanced beyond human limits. As you struggle, the network offers you one last gift: temporary access to its full power. You can stop him, but it will cost you your humanity. Do you accept?',
      background: 'https://images.unsplash.com/photo-1686893860535-0df24e71ef81',
      choices: [
        {
          text: 'Accept the network\'s power',
          scoreImpacts: { memory: 1, risk: 3, attention: 1 },
          nextScene: 'ending'
        },
        {
          text: 'Fight with your own strength',
          scoreImpacts: { memory: 0, risk: 2, attention: 1 },
          nextScene: 'ending'
        }
      ]
    }
  ];

  const currentSceneData = scenes.find(s => s.id === currentScene);

  const handleChoice = (choice) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    if (choice.scoreImpacts) {
      if (choice.scoreImpacts.memory) updateScore('memory', choice.scoreImpacts.memory);
      if (choice.scoreImpacts.risk) updateScore('risk', choice.scoreImpacts.risk);
      if (choice.scoreImpacts.attention) updateScore('attention', choice.scoreImpacts.attention);
    }

    addChoice(currentScene, choice.text, choice.scoreImpacts);

    setTimeout(() => {
      if (choice.nextScene === 'ending') {
        setGameProgress({ started: true, completed: true, ending: null });
      } else {
        setCurrentScene(choice.nextScene);
      }
      setIsTransitioning(false);
    }, 1000); // Slightly longer for smoother exit animation
  };

  const handleMemoryComplete = (isCorrect) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScene(currentSceneData.nextScene);
      setIsTransitioning(false);
    }, 1000);
  };

  const handlePlayAgain = () => {
    resetGame();
    navigate('/');
  };

  useEffect(() => {
    setGameProgress({ started: true, completed: false, ending: null });
  }, []);

  if (!currentSceneData) {
    return <EndingsDashboard onPlayAgain={handlePlayAgain} />;
  }

  const pageVariants = {
    initial: { opacity: 0, x: 50, filter: "blur(10px)" },
    in: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
    out: { opacity: 0, x: -50, filter: "blur(10px)", transition: { duration: 0.6, ease: "easeIn" } }
  };

  if (currentSceneData.type === 'memory') {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gray-950">
        <Helmet>
          <title>Memory Test - Memory Evaluation Game</title>
          <meta name="description" content="Test your memory and attention in this interactive story game" />
        </Helmet>
        <AnimatedBackground imageUrl="https://images.unsplash.com/photo-1686893860535-0df24e71ef81" overlayOpacity={0.85} />
        <ScoreDisplay />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              className="w-full"
            >
              <MemoryQuestion
                question={currentSceneData.question}
                options={currentSceneData.options}
                correctAnswer={currentSceneData.correctAnswer}
                onComplete={handleMemoryComplete}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-950">
      <Helmet>
        <title>{`${currentSceneData.title} - Memory Evaluation Game`}</title>
        <meta name="description" content="An interactive story game testing memory, risk-taking, and attention" />
      </Helmet>

      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentScene}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <AnimatedBackground imageUrl={currentSceneData.background} overlayOpacity={0.75} />
        </motion.div>
      </AnimatePresence>

      <ScoreDisplay />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            className="w-full max-w-4xl"
          >
            <div className="bg-gray-950/70 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-purple-500/30 rounded-br-3xl pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-full animate-[spin_4s_linear_infinite]" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">
                    {currentSceneData.title}
                  </h2>
                </div>

                <div className="min-h-[150px] mb-10">
                  <TypewriterParagraph text={currentSceneData.text} />
                </div>

                <div className="space-y-4">
                  {currentSceneData.choices.map((choice, index) => (
                    <ChoiceButton
                      key={index}
                      text={choice.text}
                      onClick={() => handleChoice(choice)}
                      scoreImpacts={choice.scoreImpacts}
                      disabled={isTransitioning}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryGame;
