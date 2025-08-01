declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
  }

// This module declaration allows TypeScript to understand CSS imports. 