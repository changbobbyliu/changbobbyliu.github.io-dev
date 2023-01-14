import { SelfIntroSection } from "./sections/SelfIntro.section";
import { TestEsbuildSection } from "./sections/TestEsbuild.section";
import { TestReactQuearySection } from "./sections/TestReactQueary.section";

export const LandingScreen = () => {
	return (
		<div className="flex flex-col items-center">
			<SelfIntroSection containerClassName="mt-24 mb-16" />
			<TestEsbuildSection containerClassName="mb-16" />
			<TestReactQuearySection />
		</div>
	);
};
