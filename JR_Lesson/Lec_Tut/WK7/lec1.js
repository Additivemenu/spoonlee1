console.log(1)

{
    let flight = [{ origin: 'MEL', destination: 'CAN' }];
    getStop(flight);
    
    let flight1 = [{ origin: 'MEL', destination: 'CAN' }, { origin: 'CAN', destination: 'PVG' }];
    getStop(flight1);
    
    // BA新需求: 如果flight中stop超过15个, 显示'dream trip'; 要考虑到代码的可扩展性(Reusable), 可维护性(Matainability), 可读性(Readability)

    function getStop(flight){
        switch(flight.length){
            case 1: 
                return "Direct";
            case 2:
                return "1 Stop";
            default:
                return (flight.length-1)+" Stops";
        }
    }

    function getStop1(flights){        // 
        return flight.length === 1 ? 'Direct' : (flight.length - 1) + 'Stop' + (flight.length > 2 ? 's' : '');
    }

    // 老师的写法: 
    function getStop2(flights){
        const length = flight.length;

        // 利用字典数据 (即一个HashMap)
        const specialStopMap = {
            0: 'Direct',
            1: '1 Stop',
            6: 'hello world',
            15: 'The dream flight',
            10: 'Another special message'
        }

        const normalStops = (length - 1) + ' Stops'
        const specialStops = specialStopMap[length];

        return specialStops || normalStops;
    }

}


{
    
    function calculateIncomeTax(income){
        let incomeTaxMap = [
            {min: 0, max: 18200, rate: 0, base: 0},
            {min: 18200, max: 37000, rate: 0.19, base: 0},
            {min: 37000, max: 90000, rate: 0.325, base: 3572},
            {min: 90000, max: 180000, rate: 0.37, base: 20797},
            {min: 1800000, max: Number.Infinity, rate: 0.45, base: 54096},
        ]

        let row
        for(let i=0; i < incomeTaxMap.length; i++){
            if(income >= incomeTaxMap[i].min && income < incomeTaxMap[i].max){
                row = incomeTaxTable[i];
            }
        }

        const tax = row.base + (income-row.min) * row.rate;
        return tax;

    }


}

