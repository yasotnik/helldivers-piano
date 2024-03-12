type StatusProps = {
    status: string;
};

export const Status = ({ status }: StatusProps) => {
    let gameStatus = '';
    if (status === "ok") {
        gameStatus = "SUCCESS";
    }
    if (status === "error") {
        gameStatus = "YOU DIED";
    }
    return (
        <div className={`status ${status}`}>
            {gameStatus}
        </div>
    );
}