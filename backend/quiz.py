def find_missing_frames(frames_received):
    if len(frames_received) == 0:
        return {
            "missing_ranges": [],
            "total_missing": 0,
            "longest_gap": None
        }
    
    total_frames_expected = max(frames_received)
    
    received_frames_set = set(frames_received)
    
    missing_ranges = []      
    total_missing_count = 0  
    gap_start = 0
    longest_gap_found = 0 
    
    for frame_number in range(1, total_frames_expected + 1):
        
        if frame_number not in received_frames_set:
            if gap_start is None:
                gap_start = frame_number
                
        else:
            if gap_start is not None:
                gap_end = frame_number - 1
                frames_in_gap = gap_end - gap_start + 1
                
                missing_ranges.append([gap_start, gap_end])
                total_missing_count += frames_in_gap
                
                if longest_gap_found is None or frames_in_gap > (longest_gap_found[1] - longest_gap_found[0] + 1):
                    longest_gap_found = [gap_start, gap_end]
                
                gap_start = None
    
    if gap_start is not None:
        gap_end = total_frames_expected
        frames_in_gap = gap_end - gap_start + 1
        
        missing_ranges.append([gap_start, gap_end])
        total_missing_count += frames_in_gap
        
        if longest_gap_found is None or frames_in_gap > (longest_gap_found[1] - longest_gap_found[0] + 1):
            longest_gap_found = [gap_start, gap_end]
    
    return {
        "missing_ranges": missing_ranges,
        "total_missing": total_missing_count,
        "longest_gap": longest_gap_found
    }


test_frames = [1, 2, 3, 5, 6, 10, 11, 16]
print(find_missing_frames(test_frames))