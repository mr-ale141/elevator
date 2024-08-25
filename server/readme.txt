1. Grab DEM files in hgt format with 3 arc-second resolution. The best available source is http://viewfinderpanoramas.org/dem3.html.
Place all *.hgt files to one directory.
2. run `make_data -hgt <PATH_TO_HGT_FILES> -out dem_tiles`
3. You should find two files: `dem_tiles` and `dem_tiles.idx`