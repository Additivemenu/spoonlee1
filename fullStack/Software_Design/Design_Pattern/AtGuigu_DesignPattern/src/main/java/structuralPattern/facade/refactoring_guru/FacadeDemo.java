package structuralPattern.facade.refactoring_guru;

/**
 * @author xueshuo
 * @create 2023-04-23 10:45 pm
 */
import structuralPattern.facade.refactoring_guru.facade.VideoConversionFacade;

import java.io.File;

public class FacadeDemo {
    public static void main(String[] args) {
        VideoConversionFacade converter = new VideoConversionFacade();
        File mp4Video = converter.convertVideo("youtubevideo.ogg", "mp4");
        // ...
    }
}
