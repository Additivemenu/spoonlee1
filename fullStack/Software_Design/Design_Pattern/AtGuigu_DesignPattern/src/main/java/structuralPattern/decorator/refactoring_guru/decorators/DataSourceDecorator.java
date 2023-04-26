package structuralPattern.decorator.refactoring_guru.decorators;

import structuralPattern.decorator.refactoring_guru.DataSource;

/**
 * abstract base decorator
 *
 * @author xueshuo
 * @create 2023-04-26 2:12 pm
 */
public class DataSourceDecorator implements DataSource {
    private DataSource wrappee;         // recursive composition

    DataSourceDecorator(DataSource source) {
        this.wrappee = source;
    }

    @Override
    public void writeData(String data) {        // 调用起来像是在调用wrappee的writeData(), readData() 一样
        wrappee.writeData(data);
    }

    @Override
    public String readData() {
        return wrappee.readData();
    }
}
