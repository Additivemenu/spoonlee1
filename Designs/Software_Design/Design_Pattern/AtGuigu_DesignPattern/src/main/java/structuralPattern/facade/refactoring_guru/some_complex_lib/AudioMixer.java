package structuralPattern.facade.refactoring_guru.some_complex_lib;

/**
 * @author xueshuo
 * @create 2023-04-23 10:44 pm
 */
import java.io.File;

public class AudioMixer {
    public File fix(VideoFile result){
        System.out.println("AudioMixer: fixing audio...");
        return new File("tmp");
    }
}
