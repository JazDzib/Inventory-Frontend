interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, total, limit, onPageChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="mx-auto mt-12 flex max-w-screen-xl items-center justify-between px-4 text-[#E9DDFF]/70 md:px-8">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border border-[#2d3748] bg-[#1f2937] px-4 py-2 duration-150 hover:bg-[#2d3748] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <div className="text-sm font-medium">
        Página {page} de {totalPages}
      </div>

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border border-[#2d3748] bg-[#1f2937] px-4 py-2 duration-150 hover:bg-[#2d3748] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}