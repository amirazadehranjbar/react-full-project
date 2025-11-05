import {Progress} from "flowbite-react";

function FlowBitProgress({percent}) {
    return (

            <Progress progress={percent} size="lg" labelProgress className="text-slate-400 font-mono" color="indigo"/>


    )
}

export default FlowBitProgress
