import { firestore } from '../../firebase/firebase.utils';

export const getOrCreateScoreDocument = async (teacherId, year) => {
    const scoreRef = firestore.doc(`lessonPlanScores/${year}/summary/${teacherId}`);
    const snapShot = await scoreRef.get();

    if(!snapShot.exists){
        try{
            await scoreRef.set({
                percentSubmitted: {
                    rate: 0,
                    numScores: 0
                }, 
                onTime: {
                    rate: 0,
                    numScores: 0
                }
            });
        }catch(e){
            console.log('error creating score document', e.message)
        }
    }

    return scoreRef;
}

export const calculateLessonPlanAverage = (scoreRef, lessonPlan) => {
    const previousData = scoreRef.data();
    const prePercent = previousData.percentSubmitted;
    const preOnTime = previousData.onTime;
    const { percentSubmitted, onTime } = lessonPlan.scores.average;

    console.log('previous', previousData);
    console.log('lessonPlan', lessonPlan);

    const percentSubmittedScore = (prePercent.rate + percentSubmitted.rate) / (prePercent.numScores + 1);
    const onTimeScore = (preOnTime.rate + onTime.rate) / (preOnTime.numScores + 1);

    return ({
        percentSubmitted: {
            rate: percentSubmittedScore,
            numScores: prePercent.numScores + 1
        }, 
        onTime: {
            rate: onTimeScore,
            numScores: preOnTime.numScores + 1
        }
    });
}