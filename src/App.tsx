import "./App.css";
import { Stratagem } from "./components/Stratagem";
import { StratagemCode } from "./constants";

function App() {
    const keys = Object.keys(StratagemCode);
    const randIdx = Math.floor(Math.random() * 3);
    const randomKey = keys[randIdx];
    return (
        <>
            <div className="card">
                <Stratagem
                    stratagem={randomKey as keyof typeof StratagemCode}
                />
            </div>
        </>
    );
}

export default App;
