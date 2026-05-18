# React Hook
<!-- Just kind of like a Utility Function -->
<!-- //Just Normal js function -->
-useStete()    //It maintains the state of the application/components
  const [data] = useState([]); // state variable;
 const data =[] ; //Normal JS variable

 <!-- To update state variable useState gives one function setter function -->
  const [data, setData] = useState([]);
 const arr = useState([]);
 const [data, setData] = arr;
 const data = arr[0];
 const setData = arr[1];


  <!-- In short UseState variable keep the Ui layer In sync with data layer -->
-useEffect()
//useEffect function takes 2 arguments ,1st- callback function and 2nd- dependency array
useEffect(()=>{},[])
<!-- useEffect will be called after the component has been rendered  -->
<!-- State variable -  Keeps UI layer in sync with Data Layer -->
<!-- Whenever the state variable changes react will re-render my components -->

<!-- React make DOM-Manipulation /Operation so efficient and fast -->

<!-- reconciliation algorithm /React Fiber
The algorithm React uses to diff one tree with another to determine which parts need to be changed. -->
<!-- react create a virtual DOM (representation of actual DOM) and then compare it with the actual DOM and then update the actual DOM  -->
Diff Algoritm - Find out the difference b/w Old virtual DOM and new Virtual DOM and update the actual DOM
//Virtual DOM is just a object
# Export/Import 
<!-- Named Export/Import -->//When you have to export multiple things from 1 component
export const ComponentName;
import { ComponentName } from './ComponentName';

<!-- Default Export/Import -->
export default ComponentName;
import ComponentName from './ComponentName';
<!-- React Router dom -->
<!-- import { useRouteError } from 'react-router-dom'; by this we can show erro 
 -->

 #2 types of Routing 
    -Client Side Routing
    -Server Side Routing