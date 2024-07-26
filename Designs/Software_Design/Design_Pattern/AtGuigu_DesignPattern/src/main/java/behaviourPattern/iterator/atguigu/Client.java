package behaviourPattern.iterator.atguigu;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-06-21 7:25 pm
 */
public class Client {
    public static void main(String[] args) {
        List<College> collegeList = new ArrayList<>();

        ComputerCollege computerCollege = new ComputerCollege();
        InfoCollege infoCollege = new InfoCollege();

        collegeList.add(computerCollege);
        collegeList.add(infoCollege);

        OutputImp outputImp = new OutputImp(collegeList);
        outputImp.printCollege();

    }
}
