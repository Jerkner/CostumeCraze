import React from "react"
import DashedLine from "../../components/DashedLine"

export default function HostIncome() {
    const transactionsData = [
        { amount: 720, date: "Jan 3, 2023", id: "1" },
        { amount: 560, date: "Dec 12, 2022", id: "2" },
        { amount: 980, date: "Dec 3, 2022", id: "3" }
    ]
    return (
        <section className="host-income-section">
            <h1>Income</h1>
            <div className="host-income-content">
                <div className="graph">
                    <div className="graph-level">
                        <p>5k€</p> <DashedLine />
                    </div>
                    <div className="graph-level">
                        <p>4k€</p> <DashedLine />
                    </div>
                    <div className="graph-level">
                        <p>3k€</p> <DashedLine />
                    </div>
                    <div className="graph-level">
                        <p>2k€</p> <DashedLine />
                    </div>
                    <div className="graph-level">
                        <p>1k€</p> <DashedLine />
                    </div>
                    <div className="graph-level">
                        <p>0€</p> <DashedLine />
                    </div>
                    <div className="graph-bars">
                        <div className="graph-bar">
                            <div className="bar bar1"></div>
                            <p>Jul</p>
                        </div>
                        <div className="graph-bar">
                            <div className="bar bar2"></div>
                            <p>Aug</p>
                        </div>
                        <div className="graph-bar">
                            <div className="bar bar3"></div>
                            <p>Sep</p>
                        </div>
                        <div className="graph-bar">
                            <div className="bar bar4"></div>
                            <p>Oct</p>
                        </div>
                        <div className="graph-bar">
                            <div className="bar bar5"></div>
                            <p>Nov</p>
                        </div>
                        <div className="graph-bar">
                            <div className="bar bar6"></div>
                            <p>Dec</p>
                        </div>
                    </div>
                </div>
                <div className="host-income-stats">
                    <h2>2,260€</h2>
                    <div className="info-header">
                        <h3>Your transactions (3)</h3>
                        <p>
                            Last <span>30 days</span>
                        </p>
                    </div>
                    <div className="transactions">
                        {transactionsData.map((item) => (
                            <div
                                key={item.id}
                                className="transaction"
                            >
                                <h3>{item.amount}€</h3>
                                <p>{item.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
