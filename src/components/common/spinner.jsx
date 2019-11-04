import React, { Component, useState } from 'react'

const Spinner = ({
  width = 40,
  heigth = 40,
  color = '#03995b',
  duration = '640ms',
  isLoaded = false,
  className,
  ...props
}) => {
  if (isLoaded) return props.children

  return (
    <div className={`d-flex justify-content-center ${className}`}>
      <svg
        version="1.0"
        width={`${width}px`}
        height={`${heigth}px`}
        viewBox="0 0 128 128"
      >
        <g>
          <circle cx="16" cy="64" r="16" fill={color} fillOpacity="1" />
          <circle
            cx="16"
            cy="64"
            r="14.344"
            fill={color}
            fillOpacity="1"
            transform="rotate(45 64 64)"
          />
          <circle
            cx="16"
            cy="64"
            r="12.531"
            fill={color}
            fillOpacity="1"
            transform="rotate(90 64 64)"
          />
          <circle
            cx="16"
            cy="64"
            r="10.75"
            fill={color}
            fillOpacity="1"
            transform="rotate(135 64 64)"
          />
          <circle
            cx="16"
            cy="64"
            r="10.063"
            fill={color}
            fillOpacity="1"
            transform="rotate(180 64 64)"
          />
          <circle
            cx="16"
            cy="64"
            r="8.063"
            fill={color}
            fillOpacity="1"
            transform="rotate(225 64 64)"
          />
          <circle
            cx="16"
            cy="64"
            r="6.438"
            fill={color}
            fillOpacity="1"
            transform="rotate(270 64 64)"
          />
          <circle
            cx="16"
            cy="64"
            r="5.375"
            fill={color}
            fillOpacity="1"
            transform="rotate(315 64 64)"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
            calcMode="discrete"
            dur={duration}
            repeatCount="indefinite"
          ></animateTransform>
        </g>
      </svg>
    </div>
  )
}

export default Spinner
