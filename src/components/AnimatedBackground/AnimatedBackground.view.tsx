import React, { useRef, useState } from 'react'
import type { FC } from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native'
import debounce from 'lodash/debounce'
import { DEBOUNCE_DELAY, ANIMATION_VELOCITY } from '../../constants'
import { getRandomColor } from '../../utils'
import { styles } from './AnimatedBackground.styled'

type AnimatedBackgroundViewProps = {
  children: React.ReactNode
}

export const AnimatedBackgroundView: FC<AnimatedBackgroundViewProps> = ({
  children,
}) => {
  const [currentColor, setCurrentColor] = useState(getRandomColor())
  const [nextColor, setNextColor] = useState(getRandomColor())
  const [isAnimating, setIsAnimating] = useState(false)
  const animatedValue = useRef(new Animated.Value(0)).current
  const animationInterval = useRef<NodeJS.Timeout | null>(null)

  const startAnimation = () => {
    setIsAnimating(true)
    animationInterval.current = setInterval(() => {
      const newColor = getRandomColor()
      setNextColor(newColor)
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: ANIMATION_VELOCITY,
        useNativeDriver: false,
      }).start(() => {
        setCurrentColor(newColor)
        animatedValue.setValue(0)
      })
    }, ANIMATION_VELOCITY)
  }

  const stopAnimation = () => {
    setIsAnimating(false)
    if (animationInterval.current) {
      clearInterval(animationInterval.current as NodeJS.Timeout)
      animationInterval.current = null
    }
  }

  const handlePress = debounce(() => {
    if (isAnimating) {
      stopAnimation()
    } else {
      const newColor = getRandomColor()
      setNextColor(newColor)
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: ANIMATION_VELOCITY,
        useNativeDriver: false,
      }).start(() => {
        setCurrentColor(newColor)
        animatedValue.setValue(0)
      })
    }
  }, DEBOUNCE_DELAY)

  const handleLongPress = () => {
    if (isAnimating) {
      stopAnimation()
    } else {
      startAnimation()
    }
  }

  const interpolatedBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [currentColor, nextColor],
  })

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: interpolatedBackgroundColor },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
