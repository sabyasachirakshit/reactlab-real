//Dragula--->
import React, { useEffect, useRef } from 'react';
import Dragula from 'react-dragula';
import 'dragula/dist/dragula.min.css';

const DragDrop = () => {
  const containers = useRef([]);

  useEffect(() => {
    containers.current = [
      document.querySelector('#container1'),
     
    ];
    
    Dragula(containers.current);
  }, []);

  return (
    <div>
      <div id="container1">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
        <div>Item 6</div>
        <div>Item 7</div>
        <div>Item 8</div>
        <div>Item 9</div>
        <div>Item 10</div>
      </div>
    </div>
  );
};

export default DragDrop;

