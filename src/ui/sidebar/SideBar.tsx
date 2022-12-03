import styles from "./SideBar.module.css";

export function SideBar() {
	return (
		<div className="bg-primary text-white fixed top-0 left-0 h-screen flex flex-col w-16">
			<i className={`iconfont icTreewithered1 ${styles["nav-item"]}`}></i>
			<i className="iconfont icethereum text-4xl"></i>
			<i className="iconfont icgame-fill text-4xl"></i>
			<i className="iconfont database text-4xl"></i>
			<i className="iconfont icComputertablet text-4xl"></i>
		</div>
	);
}
