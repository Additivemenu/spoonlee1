package structuralPattern.facade.refactoring_guru.some_complex_lib;

/**
 * @author xueshuo
 * @create 2023-04-23 10:44 pm
 */
public class BitrateReader {
    public static VideoFile read(VideoFile file, Codec codec) {
        System.out.println("BitrateReader: reading file...");
        return file;
    }

    public static VideoFile convert(VideoFile buffer, Codec codec) {
        System.out.println("BitrateReader: writing file...");
        return buffer;
    }
}
