
import { useState } from 'react';
import './App.css'



function App() {
  const [option, setOption] = useState('Minsk');

  const onclick = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [option],
      func: (option) => {
        const block = document.querySelector('.noblock');
        if (block) {
          const cssUrl = chrome.runtime.getURL('content-script.css');
          block.classList.add('block');
          block.innerHTML = `<link rel="stylesheet" href="${cssUrl}"></link>Погода в городе ${option} +30`;

        }

      }
    })
  }
      const button = document.querySelector('.button-weather');
      if (button) {
        button.addEventListener('click', () => {
          onclick();
        });
      }


  return (
    <>
      <label htmlFor="CITY">Выберите город</label>
      <select className='select' title="city" name="city" id="CITY" value={option} onChange={(e) => setOption(e.target.value)}>
        <option className='city' value="London">London</option>
        <option className='city' value="Minsk" >Minsk</option>
        <option className='city' value="Tokyo">Tokyo</option>
      </select>
      <button onClick={() => {onclick()}}>save</button>
    </>
  )
}

export default App
