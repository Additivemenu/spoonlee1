import TabSwitcher, { Tab, TabPanel } from "./components/TabSwitch";

function App() {
  return (
    <div className="App">
      <h1>TabSwitcher with Compound Components</h1>
      <TabSwitcher>
        <Tab id="a">
          <button>a</button>
        </Tab>
        <Tab id="b">
          <button>b</button>
        </Tab>

        <TabPanel whenActive="a">
          <div>a panel</div>
        </TabPanel>

        <TabPanel whenActive="b">
          <div>b panel</div>
        </TabPanel>
      </TabSwitcher>
    </div>
  );
}
export default App;
