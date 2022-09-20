export const Question = {
  title: "Find Duplicate File in System",
  instruction: `<p> Given a list <code>paths</code> of directory info, including the directory path, and all the files with contents 
  in this directory, return <i>all the duplicate files in the file system in terms of their paths.</i> You may return the answer in 
  <strong> any order </strong>. </p> <p> A group of duplicate files consists of at least two files that have the same content. </p> <p> A
  single directory info string in the input list has the following format: </p> <li> "root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ... fn.txt(fn_content)" </li> 
  <p> It means there are <code>n</code> files <code>(f1.txt, f2.txt ... fn.txt)</code> with content <code>(f1_content, f2_content ... fn_content)</code> respectively in the directory 
  <code>"root/d1/d2/.../dm"</code>. Note that <code>n >= 1</code> and <code>m >= 0</code>. If <code>m = 0</code>, it means the directory is just the root directory.</p>
  <p> The output is a list of groups of duplicate file paths. For each group, it contains all the file paths of the files that have the same content. A file path is a string that has the following
  format:</p><li><code>"directory_path/file_name.txt"</code></li>`,
  examples: [{input:'paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]', output: '[["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]'}, 
  {input: `paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)"]`, output: `[["root/a/2.txt","root/c/d/4.txt"],["root/a/1.txt","root/c/3.txt"]]`}],
  constraints: ["1 <= paths.length <= 2 * 104", "1 <= paths[i].length <= 3000", "1 <= sum(paths[i].length) <= 5 * 105", `paths[i] consist of English letters, digits, '/', '.', '(', ')', and ' '.`, `You may assume no files or directories share the same name in the same directory.`, `You may assume each given directory info represents a unique directory. A single blank space separates the directory path and file info.`],
};
