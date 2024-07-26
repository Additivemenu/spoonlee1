package structuralPattern.facade.refactoring_guru.some_complex_lib;

/**
 * @author xueshuo
 * @create 2023-04-23 10:42 pm
 */
public class VideoFile {
    private String name;
    private String codecType;

    public VideoFile(String name) {
        this.name = name;
        this.codecType = name.substring(name.indexOf(".") + 1);
    }

    public String getCodecType() {
        return codecType;
    }

    public String getName() {
        return name;
    }
}
