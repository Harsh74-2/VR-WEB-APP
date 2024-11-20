declare module 'aframe-react' {
    import * as React from 'react';
    import * as AFrame from 'aframe';
  
    // Define common props for A-Frame entities
    export interface EntityProps {
      id?: string;
      className?: string;
      position?: string;
      rotation?: string;
      scale?: string;
      geometry?: string;
      material?: string;
      animation?: string;
      [key: string]: any; // Allow any other props
    }
  
    // Entity component
    export class Entity extends React.Component<EntityProps & React.HTMLAttributes<HTMLElement>> {
      el: AFrame.Entity; // Reference to the A-Frame entity
    }
  
    // Scene component
    export class Scene extends React.Component<React.HTMLAttributes<HTMLElement>> {
      el: AFrame.Scene; // Reference to the A-Frame scene
    }
  }
  