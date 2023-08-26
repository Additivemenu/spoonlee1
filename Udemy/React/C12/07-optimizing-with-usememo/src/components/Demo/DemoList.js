import React, {useMemo} from 'react';

import classes from './DemoList.module.css';

const DemoList = (props) => {

  const {items} = props;

  // this line represents some long-running tasks
  const sortedList =  useMemo(()=>{   // memorize sorted data across render cycles
    console.log(`items sorted`)
    return items.sort((a, b) => a - b);
  }, [items])   // once items gets changed, re-execute 1st arguemnt function

  console.log('DemoList Running!')

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DemoList;
