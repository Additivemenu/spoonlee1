package javaCore.chap3;

// UniMelb Java week3 workshop
//

public class marsMap {
    public static void main(String[] args)
    {
        // TODO: Write your code for solving the problem here.
		// int mapWidth = Integer.parseInt(args[0]);
		// int mapHeight = Integer.parseInt(args[1]);
		// int startX = Integer.parseInt(args[2]);
		// int startY = Integer.parseInt(args[3]);
		// int targetX = Integer.parseInt(args[4]);
		// int targetY = Integer.parseInt(args[5]);

        //Map map1 = new Map(mapWidth, mapHeight,targetX, targetY, startX, startY);
		Map map1 = new Map(5, 3, 4, 2, 0, 0);
		// var a = new Employee("Alice",70000);
		map1.displayMap();

		map1.moveEast(1);
		map1.displayMap();

		map1.moveSouth(2);
		map1.displayMap();

		
    }



	static class Map{
		// fields
		private int mapWidth;
		private int mapHeight;
		private int targetX;
		private int targetY;
		private int currentX;
		private int currentY;

		// constructor
		public Map(int w, int h, int tX, int tY, int cX, int cY){
			mapWidth = w;
			mapHeight = h;
			targetX = tX;
			targetY = tY;
			currentX = cX;
			currentY = cY;
		}

		// methods
		public void displayMap(){
			for (int i =0; i<mapHeight; i++){ // loop over rows: 0, 1, 2 ; i is actually y
				for(int j = 0; j<mapWidth; j++){ // loop over columns: 0, 1, 2, 3 ,4, j is actually x
	
					if(j==currentX && i==currentY){ // (j, i) --> (x, y)
						System.out.print("M"+"");
					}else if(j==targetX && i==targetY){ 
						System.out.print("x"+"");
						
					}else{
						System.out.print("."+"");
					}
				}
				System.out.println();
			}
			System.out.println("======");
		}

		public void moveEast(int dis){
			currentX = currentX + dis; 
		}

		public void moveWest(int dis){
			currentX = currentX - dis; 
		}

		public void moveNorth(int dis){
			currentY = currentY - dis; 
		}

		public void moveSouth(int dis){
			currentY = currentY + dis; 
		}
	} // -Map
}
