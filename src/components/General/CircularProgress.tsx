import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type Props = {
    value: number,
    text: string,
    textColor?: string;
}

export default function CircularProgress(props: Props) {
    let txtColor = props.textColor ? props.textColor : '#f4f4f5';
    let pathColor = "#EB5656";
    if (props.value >= 75) pathColor = "#94CC00"
    else if (props.value >= 25 && props.value < 75) pathColor = "#FFD325";

    return (
        <CircularProgressbar
            value={props.value}
            text={props.text}
            styles={
                buildStyles({
                    textSize: "23px",                    
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,
                    strokeLinecap: 50,
                    // Colors                                
                    pathColor: pathColor,
                    textColor: txtColor,                    
                    backgroundColor: '#535353',
                })
            }
        />
    )
}