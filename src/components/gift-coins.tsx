import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

const FlyingCoins = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAnimating(true);
    }, 1000);
  }, []);

  // Анимации для монет
  const coinAnimation = {
    initial: { opacity: 1, x: 0, y: 0 },
    animate: {
      x: [0, 100, 200], // траектория полета по X
      y: [0, -50, -100], // траектория полета по Y
      opacity: [1, 0.8, 0], // постепенное исчезновение
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
  <AlertDialog open={false} onOpenChange={setIsAnimating}>
    <AlertDialogContent className={'w-2/3'}>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          {isAnimating && (
            <motion.div
              className="absolute w-6 h-6 bg-yellow-400 rounded-full"
              initial="initial"
              animate="animate"
              variants={coinAnimation}
            />
          )}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  );
};

export default FlyingCoins;
